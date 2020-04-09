function handleClick() {
  const element = document.createElement('div')
  element.innerHTML = _.join(['Derrick', 'Liu'], '***')
  document.body.appendChild(element)
}

export default handleClick