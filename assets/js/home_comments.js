// method to create the form data for new comment using AJAX
{
    let createComment = function(){
        let newCommentForm = $('new-comment');

       
        newCommentForm.submit(function(e){
            e.preventDefault();


            $.ajax({
                type: 'comment',
                url:'/comments/newcomment',
                data:newCommentForm.serialize(),
                success: function(data){
                    let newComment = newCommentDom(data.data.comment);
                    $('#post-comment-list>ul').prepend(newComment);
                    deleteComment($('.delete-comment-button',newComment));
                    new Noty({
                        theme: 'relax',
                        text: "Comment published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();


                },
                error: function(error)
                {
                    console.log(error.responseText);
                }
            })
        });
    }

    // method to create a comment in DOM
    let newCommentDom = function(comment){
        return $(`<li id="comment-${ comment._id }">
        <p>
            ${ comment.user.name }
            <br>
            <small>
                ${ comment.content }
            </small>
            <small>
                <a class="delete-comment-button" href="/comments/destroy/${ comment._id }">Delete</a>
            </small>
    
        </p>
    </li>
    `)
    }

    // Method to delete the comment from DOM
    let deleteComment = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url:$(deleteLink).prop('href'),
                success: function(data){
                    $(`#comment-${data.data.comment_id}`).remove();
                },error:function(error){
                    console.log('error.responseText');
                }
            });
        });
    }

    createComment();
}