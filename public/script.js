let servingSlider;
let servingButton;
let servingSize;
let ingredientAmount;
let initialServingSize;
let currentSize;
let commentButton;
let commentBox;
let commentInput;
let comments;

function preload(){
  console.log(window.location.pathname);
  comments = loadJSON("/comments" + window.location.pathname);
}

function setup() {
  noCanvas();
  
  // Selectors
  servingSlider = select("#serving-slider");
  servingButton = select("#serving-button");
  servingSize = select("#serving-size");
  ingredientAmount = selectAll(".ingredient-amount");
  commentButton = select("#submit-comment");
  commentBox = select("#comments-box");
  commentInput = select("#new-comment");
  
  
  // Changing serving size
  initialServingSize = servingSlider.value();
  currentSize = initialServingSize;
  
  servingButton.mouseClicked(function(){
    let multiplier = currentSize/initialServingSize;

    for(let i=0; i<ingredientAmount.length; i++){
      let amt = ingredientAmount[i].html();
      let newAmt = amt * multiplier;
      ingredientAmount[i].html(newAmt);
    }
    
    initialServingSize = currentSize;
  });
  
  for(let i in comments){
    // commentBox.html("<article class='comments'>" + comments[i] + "</article>");
    let el = document.createElement("article");
    el.append(comments[i]);
    el.className = "comments";
    commentBox.elt.appendChild(el);
  }
  
  
  // Leaving comments
  commentButton.mouseClicked(function(){
    let comment = commentInput.value();
    let el = document.createElement("article");
    el.append(comment);
    el.className = "comments";
    commentBox.elt.appendChild(el);

    commentInput.value("");
    
    httpPost("/comments", {
      "comment": comment
    })
  });
  
  
}

function draw(){
  currentSize = servingSlider.value();
  servingSize.html(currentSize);
}