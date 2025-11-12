const valueInput = document.querySelector("#braсketsString");

class BracketsValidator {
  private bracketPairs: Map<string, string> = new Map([
    ["(", ")"],
    ["[", "]"],
    ["{", "}"],
  ]);

  public isValid(str: string): boolean {
    const stack: string[] = [];
  }
}
