import { store } from "../../index";

export async function fetchN(query: string) {
    const promise = await new Promise((resolve, reject) => {
        fetch(query).then(response => response.text())
            .then(resolve)
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
    return promise;
}

export const smoothScrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;

    if (c > 30) {
        return;
    }

    if (c > 0) {
        window.requestAnimationFrame(smoothScrollToTop);
        window.scrollTo(0, c - c / 8);
    }
};

export const restoreScrollPosition = () => {

    let scrolls = store.getState().vkui["componentScroll"];

    Object.keys(scrolls).forEach((component) => {
        //let componentData = scrolls[component];

        let element: any = document.getElementById(component);

        if (element) {
            element = element.getElementsByClassName("HorizontalScroll__in")[0];

            // element.scrollLeft = componentData.x;
            // element.scrollTop = componentData.y;
        }
    });
};

type views = "home" | "more";
export const getActivePanel = (view: views) => {
    let panel: string = store.getState().router["activePanel"];

    let panelsHistory: string[] = store.getState().router["panelsHistory"][view];
    if(panelsHistory) {
        panel = panelsHistory[panelsHistory.length - 1];
    }
    
    return panel;
};
