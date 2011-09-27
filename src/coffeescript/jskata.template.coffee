jsk = (tmpl, data, domParent) ->
  console.log("JSK : ", tmpl, data, domParent)
  # For each child of the template
  for own key, value of tmpl
    element = $(key)
    
    console.log "IF : ", value, typeof value
    
    # If the value is a string, end it here
    if typeof value == "string"
      element.text(value)
    #else if Object.prototype.toString.call(value) == "[object Array]"
    else
      jsk(value, tmpl[key], element)
      
    # Add the element to a parent if not
    console.log("parent", element.parent(), domParent)
    domParent.append(element) if element.parent().length == 0
      

  
# Create namespaces
window.javascriptKataDotCom ?= {}
window.jsKata ?= window.javascriptKataDotCom
window.jsk ?= window.javascriptKataDotCom
window._ ?= window.javascriptKataDotCom

window.javascriptKataDotCom.template = jsk
window.javascriptKataDotCom.t = window.javascriptKataDotCom.template
