function combine(
  input1: number | string, // or input1: Combinable
  input2: number | string, // or input2: Combinable
  conversionType: "as-number" | "as-text" // or conversionType: ConversionDescriptor
) {
  let result;
  if (typeof input1 === "number" && typeof input2 === "number") {
    result = input1 + input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
}

type Combinable = number | string;  // can also be used
type ConversionDescriptor = 'as-number' | 'as-text';