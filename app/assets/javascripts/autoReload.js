$(function() {   
function buildHTML(message) {
  if(message.image) {
    let html = 
                `<div class= "Main__chats__list" data-message-id=${message.id}>
                  <div class= "Main__chats__list__item">
                    <div class= "Main_chats_list_name">
                      ${message.user_name}
                    </div>
                    <div class= "Main_chats_list_date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class= "Main__chats__list__text">
                    <p>
                    ${message.text}
                    </p>
                    <img class= "Message__image" src= "${message.image}">
                  </div>
                </div> `
    return html;
  }else {
    let html = 
      `<div class= "Main__chats__list" data-message-id= ${message.id}>
        <div class= "Main__chats__list__item">
          <div class= "Main_chats_list_name">
            ${message.user_name}
          </div>
          <div class= "Main_chats_list_date">
            ${message.created_at}
          </div>
        </div>
        <div class= "Main__chats__list__text">
          ${message.text}
        </div>
      </div> `
    return html;
  };
}

let reloadMessages = function() {
  let last_message_id = $('.Main__chats__list:last').data("message-id") || 0;
  $.ajax( {
    url: "api/messages",
    type: 'get',
    dataType: 'json',
    data: {id: last_message_id}
  })
  .done(function(messages) {
    if(messages.length !== 0) {
      let insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.Main__chats').append(insertHTML);
      $('.Main__chats').animate({ scrollTop: $('.Main__chats')[0].scrollHeight});
    }
  })
  .fail(function() {
    alert('error');
  });
};
setInterval(reloadMessages, 7000);
});