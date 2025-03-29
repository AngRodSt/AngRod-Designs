export const getMenuQuery = /* GrapQL*/ `
    query getMenu($handle: String!){
        menu(handle: $handle){
            items {
                title
                url
            }
        }
    }
`