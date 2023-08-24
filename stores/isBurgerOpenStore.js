import {defineStore} from "pinia";
export const useIsBurgerOpenStore = defineStore("isBurgerOpen", {
    state: () => {
        return {
            isBurgerOpen: true,
        };
    },
    actions: {
        toogleIsBurgerOpen() {
            this.isBurgerOpen = !this.isBurgerOpen;
        }
    }
});