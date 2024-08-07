export const clickOutside = {
    mounted(element, { value }) {
        element.vClickOutside = (event) => {
            if (!(element === event.target || element.contains(event.target))) {
                value(event);
            }
        };

        setTimeout(() => {
            document.body.addEventListener('mousedown', element.vClickOutside);
        }, 0)
    },

    unmounted(element) {
        document.body.removeEventListener('mousedown', element.vClickOutside);
    },
};