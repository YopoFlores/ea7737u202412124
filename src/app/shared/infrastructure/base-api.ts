/**
 * Base API.
 *
 * @summary Defines the base type for API facades in a bounded context.
 * @author Juan Diego Flores Rios
 */

/**
 * Base type for API facades.
 *
 * @remarks
 * A concrete API service composes one or more endpoint classes and exposes
 * domain-driven-oriented methods to the application layer.
 */
export abstract class BaseApi {
  // No methods defined; child classes compose endpoint instances.
}
