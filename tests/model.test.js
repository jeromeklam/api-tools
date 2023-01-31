import {
  uniqueId,
  setModelValue,
  isEmptyModel,
  getNewModel,
  normalizedObjectModeler,
  normalizedObjectFirstModel,
} from "../src/json-api/model.js";

const Norm3 = {
  MAINELEM: "Free_Test",
  SORTEDELEMS: ["21", "45", "90"],
  OTHERELEMENTS: [],
  Free_Test: {
    21: { attributes: { name: "test" }, id: "21" },
    90: { attributes: { name: "test" }, id: "90" },
    45: { attributes: { name: "test" }, id: "45" },
  },
  errors: [],
  length: 3,
};

/**
 * uniqueId
 */
test("uniqueId : Verify null id", () => {
  const result = uniqueId();
  expect(result).toBe(null);
});
test("uniqueId : Verify standard", () => {
  const result = uniqueId("Free_Test", 45);
  expect(result).toEqual("Free_Test45");
});

/**
 * setModelValue
 */
test("setModelValue : Verify empty model", () => {
  let result = null;
  setModelValue(result, "test", 45);
  expect(result).toEqual(null);
});
test("setModelValue : Verify simple value", () => {
  let result = {};
  setModelValue(result, "test", 45);
  expect(result).toEqual({ test: 45 });
});
test("setModelValue : Verify complex value", () => {
  let result = { test: { test2: 56 } };
  setModelValue(result, "test.test2", 45);
  expect(result).toEqual({ test: { test2: 45 } });
});

/**
 * getNewModel
 */
test("getNewModel : Verify simple model number id", () => {
  const result = getNewModel("Free_Test", 45);
  expect(result).toEqual({ id: 45, type: "Free_Test" });
});
test("getNewModel : Verify simple model string id", () => {
  const result = getNewModel("Free_Test", "45");
  expect(result).toEqual({ id: 45, type: "Free_Test" });
});
test("getNewModel : Verify model", () => {
  const result = getNewModel("Free_Test", "45", { name: "test" });
  expect(result).toEqual({ id: 45, type: "Free_Test", name: "test" });
});

/**
 * isEmptyModel
 */
test("isEmptyModel : Verify null", () => {
  const result = isEmptyModel(null);
  expect(result).toEqual(true);
});
test("isEmptyModel : Verify empty object", () => {
  const result = isEmptyModel({});
  expect(result).toEqual(true);
});
test("isEmptyModel : Verify object with empty id", () => {
  const result = isEmptyModel({id: 0});
  expect(result).toEqual(true);
});
test("isEmptyModel : Verify object with id", () => {
  const result = isEmptyModel({id: 4});
  expect(result).toEqual(false);
});

/**
 * buildModel
 */
test("normalizedObjectModeler : Verify model with list NormalizedObject without id", () => {
  const result = normalizedObjectModeler(
    {
      MAINELEM: "Free_Test",
      SORTEDELEMS: ["21", "45", "90"],
      OTHERELEMENTS: [],
      Free_Test: {
        21: { attributes: { name: "test" }, id: "21" },
        90: { attributes: { name: "test" }, id: "90" },
        45: { attributes: { name: "test" }, id: "45" },
      },
      errors: [],
      length: 3,
    },
    "Free_Test"
  );
  expect(result).toEqual([
    { id: "21", name: "test", type: "Free_Test" },
    { id: "45", name: "test", type: "Free_Test" },
    { id: "90", name: "test", type: "Free_Test" },
  ]);
});
test("normalizedObjectModeler : Verify model with list NormalizedObject with id", () => {
  const result = normalizedObjectModeler(
    {
      MAINELEM: "Free_Test",
      SORTEDELEMS: ["21", "45", "90"],
      OTHERELEMENTS: [],
      Free_Test: {
        21: { attributes: { name: "test" }, id: "21" },
        90: { attributes: { name: "test" }, id: "90" },
        45: { attributes: { name: "test" }, id: "45" },
      },
      errors: [],
      length: 3,
    },
    "Free_Test",
    "45"
  );
  expect(result).toEqual({ id: "45", name: "test", type: "Free_Test" });
});
test("normalizedObjectModeler : Verify model with NormalizedObject without id", () => {
  const result = normalizedObjectModeler(
    {
      MAINELEM: "Free_Test",
      SORTEDELEMS: ["45"],
      Free_Test: { 45: { attributes: { name: "test" }, id: "45" } },
      errors: [],
      length: 1,
    },
    "Free_Test"
  );
  expect(result).toEqual([{ id: "45", name: "test", type: "Free_Test" }]);
});
test("normalizedObjectModeler : Verify model with NormalizedObject with id", () => {
  const result = normalizedObjectModeler(
    {
      MAINELEM: "Free_Test",
      SORTEDELEMS: ["45"],
      Free_Test: { 45: { attributes: { name: "test" }, id: "45" } },
      errors: [],
      length: 1,
    },
    "Free_Test",
    "45"
  );
  expect(result).toEqual({ id: "45", name: "test", type: "Free_Test" });
});

/**
 * normalizedObjectFirstModel
 */
test("normalizedObjectFirstModel : first elem", () => {
  const result = normalizedObjectFirstModel(
    {
      MAINELEM: "Free_Test",
      SORTEDELEMS: ["21", "45", "90"],
      OTHERELEMENTS: [],
      Free_Test: {
        21: { attributes: { name: "test" }, id: "21" },
        90: { attributes: { name: "test" }, id: "90" },
        45: { attributes: { name: "test" }, id: "45" },
      },
      errors: [],
      length: 3,
    },
    "Free_Test",
    "45"
  );
  expect(result).toEqual({ id: "21", name: "test", type: "Free_Test" });
});
