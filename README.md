# Hướng dẫn cách chạy
Ngay sau khi clone project này về lần đầu tiên, các thành viên vui lòng tiến hành cài đặt lại các thư viện này. Cụ thể như sau:

Với NodeJS, mở terminal và gõ:
```
npm install
```
Các thư viện cần thiết cho NodeJS sẽ được cài đặt.

Với ReactJS cũng tương tự, chỉ cần chuyển vào thư mục views sau đó cài đặt. Gõ hai lệnh sau:
```
cd views
npm install
```
Các thư viện cần thiết cho ReactJS sẽ được cài đặt.

## Khởi chạy web

Sau khi clone project này, mở terminal tại thư mục mà project được clone (nếu đang ở thư mục views thì phải quay ra thư mục cha nha) và gõ:
```
npm run dev
```
Trang localhost:3000 sẽ khởi chạy tự động trên trình duyệt mặc định của máy sau vài giây nếu việc thiết lập thành công (nó hơi lâu một chút do phải khởi chạy cả ReactJS ở front-end lẫn NodeJS/ExpressJS ở back-end)

## Một số thông tin về web
- Tài khoản admin:
    username: abc@def.com
    password: 23571113
- Tài khoản user student:
    username: abd@def.com
    password: 23571113
### Công nghệ được sử dụng
- Front-end:
    - HTML + CSS
    - Bootstrap 5 (được cài đặt như là một thư viện trong thư mục node_modules của ReactJS)
    - Javascript
    - jQuery
    - ReactJS
    - Axios (để thực hiện http request trong ReactJS)
- Back-end:
    - Server code: NodeJS v20, ExpressJS
    - Database: SQLite

### Các lưu ý
- Trang web có vài thiết lập liên quan đến bảo mật thông qua các thư viện: `helmet`, `express-rate-limit`.
- Trang web đã cấu hình proxy cho ReactJS để đảm bảo ReactJS và NodeJS server tương tác được (không bị lỗi cors). Tuy nhiên, nếu xuất hiện lỗi `Invalid options object. Dev Server has been initialized using an options object that does not match the API schema... options.allowedHosts[0] should be a non-empty string` thì báo ngay để nhóm trưởng có phương án xử lý (đây là một lỗi không đại trà, chỉ một số bị thôi, nhóm trưởng cũng đã cố gắng khắc phục và hi vọng không thành viên nào bị lỗi này).
- Sau mỗi thay đổi ở NodeJS server code, vui lòng `Ctrl+C` để tắt cả ReactJS và NodeJS server, sau đó `npm run dev` lại để khởi chạy lại server, thì các thay đổi mới thấy được.

Lời cuối, chúc tất cả một ngày tốt lành!
