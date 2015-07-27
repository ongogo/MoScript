@CLS

@SET JS_HOME=%cd%
@SET PJ_HOME=%JS_HOME%\..\..
@SET PJ_EAI=%PJ_HOME%\MoCloud\mp-eai-content\webroot

@SET JAVA_PATH=%JS_HOME%\..\library\jdom-2.0.5.jar;%JS_HOME%\..\library\mo-common.jar;%JS_HOME%\..\library\mo-utility.jar

@REM ============================================================
@SET JAVA_BUILDER=org.mo.util.javascript.FJsFileBuilder
@"%JAVA_HOME%\bin\java.exe" -Xms256m -Xmx512m -cp %JAVA_PATH% %JAVA_BUILDER% %JS_HOME% release

@REM ============================================================
@COPY /Y %JS_HOME%\9.1.01-context\*.js %JS_HOME%\ajs\

@"%JAVA_HOME%\bin\java.exe" -jar %JS_HOME%\..\library\compiler.jar --js ajs\mo.js  --js_output_file ajs\release\mo.js
@"%JAVA_HOME%\bin\java.exe" -jar %JS_HOME%\..\library\compiler.jar --js ajs\me.js  --js_output_file ajs\release\me.js
@"%JAVA_HOME%\bin\java.exe" -jar %JS_HOME%\..\library\compiler.jar --js ajs\eai.js --js_output_file ajs\release\eai.js

@XCOPY /E /Y %JS_HOME%\ars\eai                %PJ_EAI%\ars\eai
@XCOPY /E /Y %JS_HOME%\ars\shader             %PJ_EAI%\ars\shader

@COPY /Y %JS_HOME%\ajs\md5.js                 %PJ_EAI%\ajs\md5.js
@COPY /Y %JS_HOME%\ajs\release\lzma.js        %PJ_EAI%\ajs\lzma.js
@COPY /Y %JS_HOME%\ajs\release\lzma_worker.js %PJ_EAI%\ajs\lzma_worker.js
@COPY /Y %JS_HOME%\ajs\release\me.js          %PJ_EAI%\ajs\me.js
@COPY /Y %JS_HOME%\ajs\release\mo.js          %PJ_EAI%\ajs\mo.js
@COPY /Y %JS_HOME%\ajs\release\eai.js         %PJ_EAI%\ajs\eai.js
@COPY /Y %JS_HOME%\ajs\context_cn.js          %PJ_EAI%\ajs\context_cn.js
