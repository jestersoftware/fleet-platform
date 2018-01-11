import React from 'react'

import relationshipManagerService from './example-service'

class RelationshipManager extends React.Component {
    state = { nodes: [] }

    async componentDidMount() {
        let id = '00000000-0000-0000-0000-000000000000'

        let nodes = await relationshipManagerService.skinnyTree(id)

        this.setState({ nodes })
    }

    render() {
        let nodes = this.state.nodes.map(node => {
            let nodeJsx = (
                <div key={node.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 500, height: 50, color: 'white', backgroundColor: 'red', margin: 5}}>
                    {node.name}
                </div>
            )
            return nodeJsx
        })

        return (
            <React.Fragment>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {nodes}
                </div>
            </React.Fragment>
        )
    }
}

export default RelationshipManager