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
                    $('#post-list>ul').prepend(newPost);
                    deletePost($('.delete-post-button',newPost));
                     // call the create comment class
                     new PostComments(data.data.post._id);

                     new Noty({
                         theme: 'relax',
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
        return $(`<li id="post-${post._id}">
                        <p>
                                <small>
                                    <a class="delete-post-button" href="/posts/destroy/${post._id}">Delete</a>
                                </small>
                            <br>
                            ${ post.user.name }
                            <br>
                            <small>
                            ${ post.content}
                            </small>
                        </p>
                        <div id="post-comment-list">
                            <ul id="post" id="post-comment-${ post._id }">
                                
                                <div id="post-comments">

                                        <form action="/comments/newcomment" method="post">
                                            <input type="text" name="content" placeholder="Type here to comment.." required>
                                            <input type="hidden" name="hidden_id" value="${ post._id}">
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
                                    $(`#post-${ data.data.post_id }`).remove();
                                    new Noty({
                                        theme: 'relax',
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
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }






    createPost();
    convertPostsToAjax();
}