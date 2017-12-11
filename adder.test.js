import { Adder } from "./adder";

describe('adder', () => {
    it('2 + 1 should equal 3 only after firing', () => {
        let adder = new Adder("My Adder");
        adder.setup();
        adder.initialize();
        adder.provideInput("in2", 2);
        adder.provideInput("in1", 1);

        let output_before_fire = adder.get("output");
        expect(output_before_fire).toBe(undefined);

        adder.fire();

        let output = adder.get("output");
        expect(output).toBe(3);
    });
});
