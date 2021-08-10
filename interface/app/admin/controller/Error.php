<?php

namespace app\admin\controller;

use app\BaseController;
use think\facade\Db;


class Error extends BaseController
{

    public function __call($method, $args)
    {
        return json(['ret' => 404, 'message' => '找不到该控制器或方法']);
    }

    protected function db($table = '')
    {
        if (!$table) {
            return null;
        }
        return Db::table(config('database.connections.mysql.prefix') . $table);
    }

    /**
     * 对用户的密码进行加密
     * @param $password
     * @param $encrypt //传入加密串，在修改密码时做认证
     * @return array/password
     */
    function get_password($password, $encrypt = '')
    {
        $pwd = array();
        $pwd['encrypt'] =  $encrypt ? $encrypt : $this->get_randomstr();
        $pwd['password'] = md5(md5(trim($password)) . $pwd['encrypt']);
        return $encrypt ? $pwd['password'] : $pwd;
    }

    /**
     * 生成随机字符串
     * @param string $lenth 长度
     * @return string 字符串
     */
    function get_randomstr($lenth = 6)
    {
        return $this->get_random($lenth, '123456789abcdefghijklmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ');
    }

    /**
     * 产生随机字符串
     *
     * @param    int        $length  输出长度
     * @param    string     $chars   可选的 ，默认为 0123456789
     * @return   string     字符串
     */
    function get_random($length, $chars = '0123456789')
    {
        $hash = '';
        $max = strlen($chars) - 1;
        for ($i = 0; $i < $length; $i++) {
            $hash .= $chars[mt_rand(0, $max)];
        }
        return $hash;
    }
}
