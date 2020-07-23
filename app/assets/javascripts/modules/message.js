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
    }
  }
  $('.Form1').on('submit', function(e) {
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      let html = buildHTML(data);
      $(".Main__chats").append(html);
      $('form')[0].reset();
      $(".Main__chats").animate({ scrollTop: $(".Main__chats")[0].scrollHeight});
      $(".Form__btn__item" ).prop('disabled', false);
    })
    .fail(function() {
        alert("メッセージ送信に失敗しました");
        $(".Form__btn__item" ).prop('disabled', false);
    });
  });
});