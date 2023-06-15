export const getPath = (elem: Element | null): string | undefined => {
  let nameParent: String[] = [];

  const findNumElem = (el: Element): String => {
    const lengthChildren = el.parentElement?.children.length ?? -1;
    for (let i = 0; i <= lengthChildren; i++) {
      if (elem === el.parentElement?.children[i]) {
        return `:nth-child(${i + 1})`;
      }
    }
    return "";
  };

  const classEl = (el: string) => {
    if (el.includes(" ", 0)) {
      return el.split(" ")[0];
    } else {
      return el;
    }
  };

  if (elem) {
    do {
      if (elem.tagName === "HTML") {
        continue;
      } else if (elem.tagName === "BODY") {
        nameParent.push(`${elem.tagName.toLowerCase()}`);
      } else {
        if (elem.className) {
          nameParent.push(
            `${elem.tagName.toLowerCase()}.${classEl(
              elem.className
            )}${findNumElem(elem)}`
          );
        } else {
          nameParent.push(`${elem.tagName.toLowerCase()}${findNumElem(elem)}`);
        }
      }
    } while ((elem = elem.parentElement));

    const selector = nameParent.reverse().join(" > ");
    return selector;
  } else {
    console.log("Произошла ошибка");
    return 'Произошла ошибка';
  }
};

document.querySelector("body")?.addEventListener("click", (e: MouseEvent) => {
  const selector: string | undefined = getPath(e.target as Element);
  if (selector) {
    console.log(document.querySelectorAll(selector));
  }
});
