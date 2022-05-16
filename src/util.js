const randomColor = () => {
    return `rgba(${Math.floor(Math.random()*255)}, 
                ${Math.floor(Math.random()*255)}, 
                ${Math.floor(Math.random()*255)}, 
                1)`
}

export { randomColor }