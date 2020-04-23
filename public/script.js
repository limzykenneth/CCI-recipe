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
  comments = loadJSON("/comments");
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
    console.log(comments[i])
  }
  commentBox.html("<article class='comments'>" + comments[0] + "</article>");
  
  
  // Leaving comments
  commentButton.mouseClicked(function(){
    let comment = commentInput.value();
    let el = document.createElement("article");
    el.append(comment);
    el.className = "comments";
    commentBox.elt.appendChild(el);

    commentInput.value("");
  });
  
  
}

function draw(){
  currentSize = servingSlider.value();
  servingSize.html(currentSize);
}