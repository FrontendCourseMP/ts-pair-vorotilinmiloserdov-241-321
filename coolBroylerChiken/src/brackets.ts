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
