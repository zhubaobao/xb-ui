import { ref } from 'vue';

const useSelection = () => {
    const selectedItems = ref([]);
    const handleSelectionChange = (items) => {
        selectedItems.value = items;
    };
    return {
        selectedItems,
        handleSelectionChange,
    };
};

export default useSelection;
