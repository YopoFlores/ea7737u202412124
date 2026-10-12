/**
 * Base API endpoint.
 *
 * @summary Provides generic REST operations for a single endpoint, mapping resources through an assembler.
 * @author Juan Diego Flores Rios
 */
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {BaseEntity} from '../domain/model/base-entity';
import {BaseResource, BaseResponse} from './base-response';
import {BaseAssembler} from './base-assembler';
import {ErrorHandlingEnabledBaseType} from './error-handling-enabled-base-type';

/**
 * Query string parameters accepted by endpoint operations.
 */
export type QueryParams = Record<string, string | number | boolean>;

/**
 * Provides generic REST operations for a single endpoint.
 *
 * @typeParam TEntity - Domain entity handled by the endpoint.
 * @typeParam TResource - Resource representation exchanged with the API.
 * @typeParam TResponse - Response envelope returned for collection queries.
 * @typeParam TAssembler - Mapper that translates between entities and resources.
 */
export abstract class BaseApiEndpoint<
  TEntity extends BaseEntity,
  TResource extends BaseResource,
  TResponse extends BaseResponse,
  TAssembler extends BaseAssembler<TEntity, TResource, TResponse>
> extends ErrorHandlingEnabledBaseType {
  protected constructor(
    protected http: HttpClient,
    protected endpointUrl: string,
    protected assembler: TAssembler
  ) {
    super();
  }

  /**
   * Fetches all entities from the configured endpoint.
   * @param params - Optional query string parameters.
   * @returns Stream with the mapped entity collection.
   */
  getAll(params: QueryParams = {}): Observable<TEntity[]> {
    return this.http.get<TResponse | TResource[]>(this.endpointUrl, {params}).pipe(
      map(response => Array.isArray(response)
        ? response.map(resource => this.assembler.toEntityFromResource(resource))
        : this.assembler.toEntitiesFromResponse(response)),
      catchError(this.handleError('Failed to fetch entities'))
    );
  }

  /**
   * Fetches a single entity by identifier.
   * @param id - Entity identifier.
   * @returns Stream with the mapped entity.
   */
  getById(id: number): Observable<TEntity> {
    return this.http.get<TResource>(`${this.endpointUrl}/${id}`).pipe(
      map(resource => this.assembler.toEntityFromResource(resource)),
      catchError(this.handleError('Failed to fetch entity'))
    );
  }

  /**
   * Creates a new entity in the remote endpoint.
   * @param entity - Entity to persist.
   * @returns Stream with the created entity returned by the API.
   */
  create(entity: TEntity): Observable<TEntity> {
    const resource = this.assembler.toResourceFromEntity(entity);
    return this.http.post<TResource>(this.endpointUrl, resource).pipe(
      map(created => this.assembler.toEntityFromResource(created)),
      catchError(this.handleError('Failed to create entity'))
    );
  }
}
