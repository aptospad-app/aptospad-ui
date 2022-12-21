/**
 * Types are useful for union types (e.g. type MyType = TypeA | TypeB).
 * Interfaces are better for declaring dictionary shapes and then implementing or extending them.
 * Enums allow you create constants that you can easily relate to, making constants more legible, freedom to create memory-efficient custom constants in JavaScript.
 *
 * References:
 * https://github.com/typescript-cheatsheets/react#types-or-interfaces
 */

/**
 * Enums
 */

/**
 * Interfaces
 */
export * from "./Interfaces/Api.interface";
export * from "./Interfaces/Home.interface";
export * from "./Interfaces/Wallet.interface";
export * from "./Interfaces/Transaction.interface";

/**
 * Types
 */
export * from "./Types/Redux.type";
