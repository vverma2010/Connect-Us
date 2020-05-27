// method to submit the form data for the new post using ajax
{
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'post',
                url: '/posts/newpost',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($('.delete-post-button',newPost));
                    // enable toggle like button functionality on the new post
                    new ToggleLike($('.toggle-like-button',newPost)); 
                    console.log(data.data.postID);
                    new CommentClass(data.data.postID);
                    new Noty({
                         theme: 'metroui',
                         text: "Post published!",
                         type: 'success',
                         layout: 'topRight',
                         timeout: 1500
                         
                     }).show();
 
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
    // method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}" class="post">
                        <p class="partition">
                                <small>
                                    <a class="delete-post-button" href="/posts/destroy/${post._id}">Delete</a>
                                </small>
                            <br>
                            ${ post.user.name }
                            <br>
                            <small>
                            ${ post.content}
                            </small>
                            <br>
                            <small>
                                    <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${ post._id}&type=Post">
                                    <i class="fas fa-thumbs-up"></i>0 Likes
                                    </a>
                            </small>
                        </p>
                        <div id="post-${ post._id}-comment-list">
                        <ul>
                            <div id="post-comments">
                              
                                    <form action="/comments/newcomment" id="post-${ post._id}-comment-form"method="post">
                                        <input type="text" name="content" placeholder="Type here to comment.." required>
                                        <input type="hidden" name="hidden_id" value="${post._id}">
                                        <input type="submit" value="Add Comment">
                                    </form>
                        
                            </div>
                        </ul>
                    </div> 
                    </li>`)
                    }

                    let deletePost = function(deleteLink)
                    {
                        $(deleteLink).click(function(e){
                        
                            e.preventDefault();

                            $.ajax({
                                type:'get',
                                url: $(deleteLink).prop('href'),
                                success: function(data){
                                    console.log(data.data.post_id);
                                    $(`#post-${ data.data.post_id }`).remove();
                                    new Noty({
                                        theme: 'metroui',
                                        text: "Post Deleted",
                                        type: 'success',
                                        layout: 'topRight',
                                        timeout: 1500
                                        
                                    }).show();
                
                                
                                },error: function(error){
                                    console.log(error.responseText);
                                }
                            })
                        })
                    }

                      // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#posts-list-container>ul>li').each(function(){
            let self = $(this);
            console.log(self)
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);
            console.log("post to ajax ");
            let postID=self.prop("id").split("-")[1];
            console.log(postID);
            new CommentClass(postID)
            
        });
    }






    createPost();
    convertPostsToAjax();
}