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

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('[data-bracketsForm]') as HTMLFormElement;
  const input = document.getElementById('bracketsInput') as HTMLInputElement;
  const resultDiv = document.querySelector('[data-result]') as HTMLDivElement;

  if (form && input && resultDiv) {
    const validator = new BracketsValidator();

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const inputValue = input.value.trim();

      if (!inputValue) {
        resultDiv.textContent = "Введите строку со скобками";
        resultDiv.style.color = "red";
        return;
      }

      const isValid = validator.isValidBrackets(inputValue);

      if (isValid) {
        resultDiv.textContent = "Скобки расставлены верно";
        resultDiv.style.color = "green";
      } else {
        resultDiv.textContent = "Скобки расставлены неверно";
        resultDiv.style.color = "red";
      }
    });
  }
});
