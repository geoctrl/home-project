/**
 * Declares the 'commonjs' format module object that identifies the "module id" for the current module.
 * Set a component's `moduleId` metadata property to `module.id` for module-relative urls
 * when the generated module format is 'commonjs'.
 */
declare var module: {id: string};
interface requireInterface {
    (id: string):any;
}

declare var require: requireInterface;

