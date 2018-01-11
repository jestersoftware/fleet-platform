import api from './example-api'

import {find} from 'lodash'

const unassignedName = 'Unassigned Resources'
const unassignedCategory = 'UNASSIGNED'

class RelationshipManagerService {
    
    async skinnyTree(id) {
        let url = `assets/orgUnits/${id}/skinnyTree`
        let tree = await api.fetch(url)
        let unassigned = find(tree, {category: unassignedCategory})
        if (unassigned) {
            unassigned.name = unassignedName
        }
        return tree
    }

}

export default new RelationshipManagerService()
