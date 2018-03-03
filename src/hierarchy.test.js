//@flow
import {PortBase, InputPort, OutputPort} from "./hierarchy"
import {Actor, Component, Parameter, Composite} from "./hierarchy";

describe('portbase', () => {
    it('constructor and names', () => {
        let portbase = new PortBase("base");
        expect(portbase.name).toBe("base");
        expect(portbase.getFullyQualifiedName()).toBe("base");
        expect(portbase.visibility).toBe("full");
    });
});

describe('inputport', () => {
    it('constructors with option', () => {
        let option = { value: 1, visibility: "expert", width: 2 };
        let input = new InputPort("in", option);
        expect(input.default).toBe(1);
        expect(input.width).toBe(2);
        expect(input.visibility).toBe("expert");
        (input.default: ?number);
    });
});

describe('outputport', () => {
    it('constructors with option', () => {
        let option = { spontaneous: true, visibility: "expert" };
        let output = new OutputPort("out", option);
        expect(output.spontaneous).toBe(true);
        expect(output.visibility).toBe("expert");
        (output.default: number);
    });
});

describe('ports and actors', () => {
    let actor = new Actor("component");

    it('basic add and find', () => {
        actor.add(new InputPort("in"));
        actor.add(new OutputPort("out"));
        actor.add(new Parameter("parm"));

        var port = actor.find("in", "ports");
        expect(port != null).toBeTruthy();
        expect(port instanceof InputPort).toBeTruthy();

        var port = actor.find("out", "ports");
        expect(port != null).toBeTruthy();
        expect(port instanceof OutputPort).toBeTruthy();

        var port = actor.find("parm", "ports");
        expect(port != null).toBeTruthy();
        expect(port instanceof Parameter).toBeTruthy();
    });

    actor = new Actor("component");

    it('add using constructor', () => {
        new InputPort("in", actor);
        new OutputPort("out", actor);
        new Parameter("parm", actor);

        var port = actor.find("in", "ports");
        expect(port != null).toBeTruthy();
        expect(port instanceof InputPort).toBeTruthy();

        var port = actor.find("out", "ports");
        expect(port != null).toBeTruthy();
        expect(port instanceof OutputPort).toBeTruthy();

        var port = actor.find("parm", "ports");
        expect(port != null).toBeTruthy();
        expect(port instanceof Parameter).toBeTruthy();
    });

    it('no random port', () => {
        var port = actor.find("random", "ports");
        expect(port).toBe(undefined);
    });

    it('actors only have port namespace', () => {
        expect(() => {
            actor.find("random", "components");
        }).toThrowError("Actors only support ports namespace");
    });

    it('unlink and relink', () => {
        let actor = new Actor("component");
        let input = new InputPort("in");
        expect(actor.add(input)).toBe(true);

        // Create a new actor and add the input port.
        let actor2 = new Actor("component2");
        expect(actor2.add(input)).toBe(true);

        expect(actor.find("in", "ports")).toBe(undefined);
        let port = actor2.find("in", "ports");
        expect(port != null).toBeTruthy();
        expect(port instanceof InputPort).toBeTruthy();
    });
});

describe('composite', () => {
    let topLevel = new Composite("topLevel");
    let composite = new Composite("composite");
    let component = new Component("component");

    it('compose hierarchy', () => {
        topLevel.add(composite);
        composite.add(component);
        expect(composite.parent).toBe(topLevel);
        expect(component.parent).toBe(composite);
    });

    it('compose hierarchy using constructor', () => {
        topLevel.remove("composite");
        composite.remove("component");
        let composite2 = new Composite("composite2", topLevel);
        let component2 = new Component("component2", composite2);
        expect(composite2.parent).toBe(topLevel);
        expect(component2.parent).toBe(composite2);

    });

    it('qualified names in hierarchy chain', () => {
        expect(component.getFullyQualifiedName())
            .toBe("topLevel.composite.component");
    });

    it('add/remove component', () => {
        let component = new Component("new-component");
        topLevel.add(component);
        expect(component.getFullyQualifiedName()).toBe("topLevel.new-component");

        topLevel.remove(component);
        expect(topLevel.find(component.name)).toBeUndefined();
    });

    it('director check', () => {
        expect(() => {
            topLevel.initialize()
        }).toThrowError("Top-level container must have a director");
    });
});
