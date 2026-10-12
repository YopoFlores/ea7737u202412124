/**
 * Base entity contract.
 *
 * @summary Minimal contract implemented by domain entities across bounded contexts.
 * @author Juan Diego Flores Rios
 */
export interface BaseEntity {
  /**
   * Unique identifier for the entity.
   */
  id: number;
}
