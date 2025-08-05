الینا هژبری - 401170661
در این کد با springboot Java، قسمت backend تمرین دوم را زدیم. در اینجا فایل‌ها را به ترتیب توضیح می‌دهم:
<div dir='rtl'>
1. DrawingAppApplication: این فایل شروع spring ما هست که در آن کلاس DrawingAppApplication اجرا می‌شود.
2. SecurityConfig: این فایل بخش امنیت برنامه را بر عهده دارد و از 4 تابع تشکیل شده. تابع SecurityFilterChain، CORS را فعال و CSRF رو غیرفعال می‌کند همچنین به یک سری URL ها اجازه دسترسی می‌دهد. تابع CorsConfigurationSource، اجازه ارتباط با http://localhost:3000 را می‌دهد تا درخواست‌های HTTP مبادله شود. تابع UserDetailsService، کار احراز هویت را انجام می‌دهد و در آخر تابع PasswordEncoder، که مشخص می‌کند پسوردها از نوع BCrypt باشند.
3. UserRepository: این فایل interface ای برای پایگاه داده user هست و مدیریت کاربران را برعهده دارد.
4. DrawingRepository: این فایل interface ای برای پایگاه داده drawing هست و مدیریت نقاشی‌ها را برعهده دارد. همچنین با استفاده از username با موجودیت user در ارتباط هست.
5. User: در این فایل موجودیت user تعریف شده است که در table My_users نگهداری می‌شوند. شامل username و password می‌شود.
6. Drawing: این فایل نیز موجودیت Drawing را تعریف می‌کند که شامل id، اسم و string ای از JSON اشکال است.
7. DrawingRequest: این فایل Dto ما هست که کارش انتقال نقاشی‌ها بین کلاینت و سرور هست. شامل اسم و string JSON اشکال است.
8. UserController: این فایل عملیات‌های مربوط به user را برعهده دارد. همچنین یک متد POST هم داریم که مربوط به register کردن user است که اگر کاربری خواست وارد شود که در پایگاه داده user های از پیش تعیین شده نبود، register شود.
9. DrawingController: این فایل هم عملیات‌های مربوط به نقاشی را انجام می‌دهد که شامل متد POST سیو کردن نقاشی‌ها و متد GET برای گرفتن نقاشی است. متد POST آن برای بخش export فرانت اند و متد GET آن برای import است.
10. Data: این فایل هم پایگاه داده‌ای از پیش تعیین شده است که 3 کاربر در آن تعریف شده است.
</div>

برای getter و setter کلاس‌ها از lombok استفاده شده است.
همچنین از chatgpt برای رفع یک سری مشکلات اضافه شده است. به طور مثال برای چک کردن table My_users از http://localhost:8080/h2-console استفاده شد اما در ابتدا با localhost refused to connect مواجه می‌شدم که با اضافه کردن خط .requestMatchers("/h2-console/**").permitAll() در فایل SecurityConfig و چند خط در فایل application.properties مشکل رفع شد. مشکل بعدی هم استفاده از POSTman برای چک کردن کد بود بود که همش خطای 400 می‌گرفتم که آن هم با تغییر اسم table users و اضافه کردن CORS مشکل حل شد.
