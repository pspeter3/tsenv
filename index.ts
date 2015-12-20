/**
 * Extend the child prototype with the parent prototype.
 * @param {any} child  The child class to extend.
 * @param {any} parent The parent class to inherit from.
 */
function __extends(child: any, parent: any): void {
    if (parent === null) {
        child.prototype = Object.create(parent);
    } else {
        for (var name in parent) {
            if (parent.hasOwnProperty(name)) {
                child[name] = parent[name];
            }
        }
        function __() {
            this.constructor = child;
        }
        __.prototype = parent.prototype;
        child.prototype = new (<any>__)();
    }
}

/**
 * Defines a new module in the system.
 * @param {string}   id      The module id.
 * @param {string[]} deps    The module dependencies.
 * @param {Function} factory The module factory.
 */
function define(id: string, deps: string[], factory: Function): void {
    if (define.modules[id] !== undefined) {
        throw new Error(`${id} is defined`);
    }
    define.modules[id] = {
        deps: deps,
        exports: undefined,
        factory: factory
    };
}

namespace define {
    /**
     * The AMD system identifier.
     * @struct
     */
    export var amd: {} = {};
    /**
     * The modules mapping.
     * @dict
     */
    export var modules: {
        [key: string]: {
            deps: string[];
            exports: any;
            factory: Function;
        };
    } = {};
}

/**
 * Evaluates a module from the system.
 * @param  {string} id The module id.
 * @return {any}       The module exports.
 */
function requirejs(id: string): any {
    var _module = define.modules[id];
    if (_module === undefined) {
        throw new Error(`${id} is undefined`);
    }
    if (_module.exports !== undefined) {
        return _module.exports;
    }
    var result = _module.factory.apply(null, _module.deps.map((name) => {
        if (name === "require") {
            return requirejs;
        }
        if (name === "exports") {
            _module.exports = {};
            return _module.exports;
        }
        return requirejs(name);
    }));
    if (result !== undefined) {
        _module.exports = result;
    }
    return _module.exports;
}

// Add to global if in node context.
(function() {
    var self: {
        global: any
    } = this;
    if (self.global !== undefined) {
        self.global.__extends = __extends;
        self.global.define = define;
        self.global.requirejs = requirejs;
    }
})();

