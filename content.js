if (
  (document.body.innerText || document.body.textContent).indexOf(
    "recipe" || "Recipe"
  ) != -1 &&
  window.location.href.slice(-4) !== "com/" &&
  !window.location.href.indexOf("allrecipes") > -1
) {
  const divsById = document.body.querySelectorAll("[id*=recipe]");
  const divsByClass = document.body.querySelectorAll("[class*=recipe]");
  const divsBySelector = [...divsById, ...divsByClass];
  const matchedDivs = getMatches(divsBySelector);

  const getMatches = (divList) => {
    const regexs = [/(<\/ul>|<\/ol>)/gi, /ingredient/gi, /print/gi];
    let threeMatches = [];
    let twoMatches = [];
    Array.from(divList).map((div) => {
      let matches = 0;
      for (regex of regexs) {
        if (div.innerHTML.match(regex)) {
          matches++;
        }
      }
      if (matches === 3) {
        threeMatches.push(div);
      } else if (matches === 2) {
        twoMatches.push(div);
      }
    });
    return threeMatches.length > 0 ? threeMatches : twoMatches;
  }

  pullToTop(matchedDivs);

  const pullToTop = (matchedDivList) => {
    const recipe = Array.from(matchedDivList)[0];

    recipe.style.maxWidth = "800px";
    recipe.style.margin = "2em auto";
    recipe.style.padding = "2em 3em";
    recipe.style.borderRadius = "8px";
    recipe.style.background = "white";
    recipe.style.boxShadow = "0px 7px 102px -7px rgba(163,163,163,1)";

    const recipeContainer = document.createElement("div");
    document.body.prepend(recipeContainer);
    recipeContainer.appendChild(recipe);

    document.addEventListener("DOMContentLoaded", function () {
      window.scrollTo(0, 0);
    });

    //make page go to top on load *NOT WORKING*
    window.onload(function () {
      document.window.scrollTop(0);
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    });
  }
}
