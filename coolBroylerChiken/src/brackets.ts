document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("[data-bracketsForm]") as HTMLFormElement;
  const result = document.querySelector("[data-result]") as HTMLOutputElement;
  const input = document.querySelector(
    "[data-bracketsInput]"
  ) as HTMLInputElement;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const isValid = validator.isValidBrackets(input.value);

    result.value = isValid
      ?`Строка "${input.value}" - ВАЛИДНА`
      :`Строка "${input.value}" - НЕВАЛИДНА`;

    result.className = isValid ? "valid" : "invalid";
  });
});

class BracketsValidator {
  private areBracketsMatching(openBr: string, closeBr: string): boolean {
    if (openBr === "{" && closeBr === "}") return true;
    if (openBr === "(" && closeBr === ")") return true;
    if (openBr === "[" && closeBr === "]") return true;
    return false;
  }

  isValidBrackets(str: string): boolean {
    const stack: string[] = [];
    for (const char of str) {
      if (char === "(" || char === "{" || char === "[") {
        stack.push(char);
      } else if (char === ")" || char === "}" || char === "]") {
        const lastBracket = stack.pop();
        if (lastBracket === undefined) {
          return false;
        }
        if (!this.areBracketsMatching(lastBracket, char)) {
          return false;
        }
      }
    }
    return stack.length === 0;
  }
}
const validator = new BracketsValidator();
