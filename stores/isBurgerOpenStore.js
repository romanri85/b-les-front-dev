import {defineStore} from "pinia";
export const useIsBurgerOpenStore = defineStore("isBurgerOpen", {
    state: () => {
        return {
            isBurgerOpen: false,
        };
    },
    actions: {
        toogleIsBurgerOpen() {
            this.isBurgerOpen = !this.isBurgerOpen;
        }
    }
});