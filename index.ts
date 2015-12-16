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

if (global) {
    global.__extends = __extends;
}
