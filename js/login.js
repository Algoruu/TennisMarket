/* var vs let vs const */
function compareVariable() {
    let num1 = 10;
    // const num2;

    num1 = 20; // 먼저 들어간 값을 빼고 이 값을 넣음
    alert('num1 : ' + num1);
}

/* ID 란에 입력된 값을 팝업창에 띄우기 */
function popId() {
    let userId = document.getElementById('txt_id').value;

    if (!userId) {
        // = userId ==""
        alert('아이디를 입력해주세요. ');

    } else {
        alert(userId);
    }
                
}


/* 나만의 함수 만들고 버튼 클릭하면 함수 호출하기 */
function myFunction() {
    let userId = document.getElementById('txt_id').value;

    if (!userId) {
        // = userId ==""
        alert('아이디를 입력해주세요. ');

    } else if (userId.length < 5) {
        alert('아이디는 최소 5자 이상이어야 합니다!', userId);
    } else {
        alert(userId);
    }

}
