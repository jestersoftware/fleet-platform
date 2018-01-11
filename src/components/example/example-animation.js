import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import ReactTransitionGroup from 'react-addons-transition-group'
import anime from 'animejs'
import Container from './example-container'
import animationTimings from './example-animationTimings'
import './example-animation.css'

// https://github.com/aholachek/react-animation-comparison

let currentAnimation

const clearCurrentAnimation = () => {
    // not sure if this does anything/is necessary?
    if (currentAnimation) currentAnimation.pause()
}

const animateIn = (gridContainer) => {
    clearCurrentAnimation()

    const cards = gridContainer.querySelectorAll('.card')

    currentAnimation = anime.timeline()
        .add({
            targets: cards,
            opacity: 0,
            duration: 1
        })
        .add({
            targets: gridContainer,
            translateX: [-1000, 0],
            opacity: [0, 1],
            duration: animationTimings.gridEnter
        })
        .add({
            targets: cards,
            duration: 800,
            opacity: [0, 1],
            translateY: [-30, 0],
            delay: function (el, i, l) {
                return i * 100
            }
        })
}

const animateOut = (gridContainer, callback) => {
    clearCurrentAnimation()

    const cards = gridContainer.querySelectorAll('.card')

    currentAnimation = anime.timeline()
        .add({
            targets: cards,
            duration: 700,
            opacity: [1, 0],
            translateY: -30,
            delay: function (el, i, l) {
                return i * 100
            }
        })
        .add({
            targets: gridContainer,
            translateX: 1000,
            opacity: [1, 0],
            duration: 1000,
            complete: callback,
            offset: '-=200'
        })
}

class AnimatedGridContents extends React.Component {
    componentWillAppear(callback) {
        console.log('componentWillAppear')

        callback()
    }
    componentDidAppear() {
        console.log('componentDidAppear')

        animateIn(ReactDOM.findDOMNode(this))
    }
    componentWillEnter(callback) {
        console.log('componentWillEnter')

        callback()
    }
    componentDidEnter() {
        console.log('componentDidEnter')

        animateIn(ReactDOM.findDOMNode(this))
    }
    componentWillLeave(callback) {
        console.log('componentWillLeave')

        animateOut(ReactDOM.findDOMNode(this), callback)
    }
    componentDidLeave() {
        console.log('componentDidLeave')
    }

    render() {
        return (<div className='grid grid-to-animate' >
            {this.props.items.map((item) => {
                return <div className='card' key={item}>{item}</div>
            })}
        </div>)
    }
}

const AnimatedGrid = props => {
    return (
        <ReactTransitionGroup>
            {
                  props.items.length ? 
                <AnimatedGridContents items={props.items} key='AnimatedGridContents' />
                  : null
            }
        </ReactTransitionGroup>
    )
}

AnimatedGrid.props = {
    items: PropTypes.array.isRequired
}

export default () => <Container><AnimatedGrid /></Container>