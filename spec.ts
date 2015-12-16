declare var global: any;

describe("tsenv", () => {
    beforeEach(() => {
        global.define.modules = {};
    });

    describe("__extends", () => {
        it("should handle null", () => {
            var Foo: any = (function(__super: any) {
                global.__extends(Foo, __super);
                function Foo() {
                }
                return Foo;
            })(null);
            var foo = new Foo();
            expect(foo instanceof Foo).toBeTruthy();
        });

        it("should handle inheritance", () => {
            var Bar: any = (function() {
                function Bar() {
                }
                return Bar;
            })();
            var Foo: any = (function(__super: any) {
                global.__extends(Foo, __super);
                function Foo() {
                }
                return Foo;
            })(Bar);
            var foo = new Foo();
            expect(foo instanceof Bar).toBeTruthy();
            expect(foo instanceof Foo).toBeTruthy();
        });

        it("should add super methods", () => {
            var Bar: any = (function() {
                function Bar() {
                }
                Bar.prototype.bar = function() {
                    return "bar";
                };
                return Bar;
            })();
            var Foo: any = (function(__super: any) {
                global.__extends(Foo, __super);
                function Foo() {
                }
                Foo.prototype.foo = function() {
                    return "foo";
                };
                return Foo;
            })(Bar);
            var foo = new Foo();
            expect(foo.bar()).toBe("bar");
            expect(foo.foo()).toBe("foo");
        });
    });

    describe("define", () => {
        it("should be a valid AMD provider", () => {
            expect(global.define.amd).toBeDefined();
        });

        it("should define a module", () => {
            var id = "foo";
            var deps = [];
            var factory = () => { };
            global.define(id, deps, factory);
            var _module = global.define.modules[id];
            expect(_module).toBeDefined();
            expect(_module.deps).toBe(deps);
            expect(_module.exports).not.toBeDefined();
            expect(_module.factory).toBe(factory);
        });

        it("should throw an error if defined twice", () => {
            global.define("foo", [], () => { });
            expect(() => {
                global.define("foo", [], () => { });
            }).toThrow();
        });
    });

    describe("requirejs", () => {
        it("should handle exports", () => {
            var id = "foo";
            var deps = ["exports"];
            var foo = {};
            var factory = (exports: any) => {
                exports.foo = foo;
            };
            global.define(id, deps, factory);
            expect(global.requirejs(id).foo).toBe(foo);
        });

        it("should handle require", () => {
            var id = "foo";
            var deps = ["exports"];
            var foo = {};
            var factory = (exports: any) => {
                exports.foo = foo;
            };
            global.define(id, deps, factory);
            global.define("bar", ["require", "exports"], (require: any, exports: any) => {
                exports.foo = require("foo").foo;
            });
            expect(global.requirejs("bar").foo).toBe(foo);
        });

        it("should throw an error if not defined", () => {
            expect(() => {
                global.requirejs("foo");
            }).toThrow();
        });
    });
});
