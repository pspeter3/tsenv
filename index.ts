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
    export var amd: {} = {};
    export var modules: {
        [key: string]: {
            deps: string[];
            exports: any;
            factory: Function;
        };
    } = {};
}

function requirejs(id: string): any {
    var _module = define.modules[id];
    if (_module === undefined) {
        throw new Error(`${id} is undefined`);
    }
    _module.factory.apply(null, _module.deps.map((name) => {
        if (name === "require") {
            return requirejs;
        }
        if (name === "exports") {
            _module.exports = {};
            return _module.exports;
        }
        return requirejs(name);
    }));
    return _module.exports;
}

if (global) {
    global.__extends = __extends;
    global.define = define;
    global.requirejs = requirejs;
}
