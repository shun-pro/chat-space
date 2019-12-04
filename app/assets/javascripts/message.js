$(function(){ 

  function buildHTML(message){
    img = ( message.image ) ? `<img src=${message.image} >` : "";
     var html =
      `<div class="message" data-id=${message.id}>
         <div class="message__upper-info">
           <div class="message__upper-info__talker">
             ${message.user_name}
           </div>
           <div class="message__upper-info__date">
             ${message.date}
           </div>
         </div>
         <div class="lower-message">
           <p class="lower-message__content">
             ${message.content}
           </p>
         </div>
         ${img}
       </div>`
     return html;
  }
$('#new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    var html = buildHTML(data);
    $('.messages').append(html); 
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    $('form')[0].reset();
  })
  .always(function(data){
    $('.form__submit').prop('disabled', false);
  })
  .fail(function(){
    alert('error');
  });
  return false;
  });
var reloadMessages = function() {
  if (window.location.href.match(/\/groups\/\d+\/messages/)){
    var last_message_id = $('.message:last').data("id");
  
  $.ajax({
    url: "api/messages",
    type: 'get',
    dataType: 'json',
    data: {id: last_message_id}
  })
  .done(function(messages) {
    //追加するHTMLの入れ物を作る
    var insertHTML = '';
    //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
    $.each(messages, function(i, message) {
      insertHTML += buildHTML(message)
    });
    //メッセージが入ったHTMLに、入れ物ごと追加
    $('.messages').append(insertHTML);
   $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
  })
  .fail(function() {
    alert('自動更新に失敗しました');
  });
}
};
setInterval(reloadMessages, 7000);
});
