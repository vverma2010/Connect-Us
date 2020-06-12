// method to create the form data for new comment using AJAX
class CommentClass{

    constructor(postID)
    {
        console.log("calling comment ajax ",postID)
        this.postContainer=$(`#post-${postID}`)// this is to find on which post comment will be published
        this.commentForm=$(`#post-${postID}-comment-form`)//to find out comment form belongs to which post
        this.createComment(postID);
        let self=this;//refers to the post on which comment is craeted/dleetdd
        $(' .delete-comment-button',this.postContainer).each(function(){
            console.log("deleting comments")
            self.deleteComment($(this));

        })//this function is ensures that dleete comment button is aplly to every comment on that post containing postID


    }
    createComment(postID){
       let postSelf=this;
    
        this.commentForm.submit(function(e){
            e.preventDefault();
            let self=this;
            $.ajax({
                type: 'post',
                url:'/comments/newcomment',
                data:$(self).serialize(),
                success: function(data){
                    let newComment = postSelf.newCommentDom(data.data.comment);
                    console.log($(`#post-${postID}-comment-list>ul`))
                    $(`#post-${postID}-comment-list>ul`).prepend(newComment);
                    postSelf.deleteComment($('.delete-comment-button',newComment));
                    // enable the functionality of toggle like button on the comment
                    new ToggleLike($('.toggle-like-button',newComment)); 

                    new Noty({
                        theme: 'metroui',
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
    newCommentDom(comment){
        return $(`<li id="comment-${ comment._id }">
        <p>
            ${ comment.user.name }
            <br>
            <small>
                ${ comment.content }
            </small>
            <br>
        <small>
                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${ comment._id }&type=Comment">
                    <i class="fas fa-thumbs-up"></i> 0Likes
                </a>
        </small>
        &nbsp;
            <small>
                <a class="delete-comment-button" href="/comments/destroy/${ comment._id }">Delete</a>
            </small>
    
        </p>
    </li>
    `)
    }

    // Method to delete the comment from DOM
    deleteComment(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url:$(deleteLink).prop('href'),
                success: function(data){
                    $(`#comment-${data.data.comment_id}`).remove();
                    new Noty({
                        theme: 'metroui',
                        text: "Comment Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                
                },error:function(error){
                    console.log('error.responseText');
                }
            });
        });
    }


}