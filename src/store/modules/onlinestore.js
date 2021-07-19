
const state = {
    image: "",
    title: "",
    contactInfo: {},
    categoryAll: [],
    categoryList: {},
}

const getters = {
    getContactInfo: state => state.contactInfo,
    getStoreTitle: state => state.title,
    getStoreImage: state => state.image,
    getCategoryAll: state => state.categoryAll,
    getCategoryList: state => state.categoryList,
}

const actions = {
    updateStore({commit}, onlineStore ) {
        commit('UPDATE_STORE', onlineStore)
    },

    callAPI({commit} ) {
        commit('CALL_API')
    },
}

const mutations = {
    CALL_API(state) {
        return true
    },
    UPDATE_STORE(state, onlineStore) {
        state.title = onlineStore.Title
        state.image = onlineStore.Image
        
        state.contactInfo.Contact = onlineStore.Contact
        state.contactInfo.Mobile = onlineStore.Mobile
        state.contactInfo.Email = onlineStore.Email
        state.contactInfo.Street = onlineStore.Street
        state.contactInfo.City = onlineStore.City
        state.contactInfo.State = onlineStore.State
        state.contactInfo.Country = onlineStore.Country
        
        state.categoryAll = onlineStore.CategoryList
        var categoryList = state.categoryAll

        for (var categoryID in categoryList) {
            var category = categoryList[categoryID]
            category["child"] = {}
            if (category.ParentID == 0) {
                if (Object.keys(state.categoryList).length == 0) {
                    state.categoryList = {
                        [category.CategoryID]: category
                    }
                } else {
                    state.categoryList[category.CategoryID] = category
                }
            }
        }

        for (var categoryID in categoryList) {
            var category = categoryList[categoryID]
            category["child"] = {}
            if (category.ParentID > 0) {
                //parent id exists look for parent and populate
                if (Object.keys(state.categoryList[category.ParentID]["child"]).length == 0) {
                    state.categoryList[category.ParentID]["child"] = { [category.CategoryID]: category }
                } else {
                    state.categoryList[category.ParentID]["child"][category.CategoryID] = category
                }
            }
        }
        return true
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}