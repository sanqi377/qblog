<?php

declare(strict_types=1);

namespace app\admin\middleware;

/**
 * 登录校验中间件
 * Class CheckLogin
 * @package app\middleware
 */
class CheckLogin
{
    /**
     * 处理请求
     *
     * @param \think\Request $request
     * @param \Closure $next
     * @return Response
     */
    public function handle($request, \Closure $next)
    {
        // 登录校验
        $path = explode("/",request()->pathinfo());
        if ($path[1] != 'login') { // 非 login 请求
            
            // 获取Token
            $token = request()->header("Authorization");
            if ($token) {
                // JWT解密token
                $jwt = new \Jwt();
                $userId = $jwt->verifyToken($token);
                if (!$userId) {
                    // token解析失败跳转登录页面
                    return json(['ret' => 401, 'data' => '请登陆']);
                }
            } else {
                // 跳转至登录页面
                return json(['ret' => 401, 'data' => '请登陆']);
            }
        } else {
            return $next($request);
        }
        return $next($request);
    }
}
