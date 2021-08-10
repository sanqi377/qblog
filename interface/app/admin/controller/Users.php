<?php

namespace app\admin\controller;

class Users extends Error
{

    /* 
     @api {post} /admin/users/login  管理员登陆
     @param string username dont'null
     @param string password dont'null
     @return array 
    */
    public function login()
    {
        $param = input('post.');

        $where['is_delect'] = 0;
        if ($param) {
            if (!empty($param['username'])) {
                $where['username'] = $param['username'];
            }
            $data = $this->db('users')->where($where)->find();
            if ($data) {
                if ($data['password'] == $this->get_password($param['password'], $data['salt'])) {
                    $jwt = new \Jwt();
                    $token = $jwt->getToken($data['id']);
                    $this->db('login_log')->insert(['user_name' => $data['username'], 'create_time' => time(), 'login_ip' => '127.0.0.1']);
                    return json(['ret' => 200, 'data' => ['type' => 'success', 'info' => '登陆成功', 'token' => $token, 'data' => $data]]);
                }
                return json(['ret' => 200, 'data' => ['type' => 'error', 'info' => '登陆密码错误']]);
            } else {
                return json(['ret' => 200, 'data' => ['type' => 'error', 'info' => '用户不存在']]);
            }
        } else {
            return json(['ret' => 401, 'data' => '请登陆']);
        }
    }

    /* 
     @api {post} /admin/users/getUserList  后台用户列表
     @param int    page     null
     @param string username null
     @return array 
    */
    public function list()
    {
        $param = input('post.');
        $page = $param['page'] ?? 1;
        $where['is_delect'] = 0;
        if (isset($param['status']) && isset($param['id'])) {
            $where['id'] = $param['id'];
            $this->db('users')->where($where)->update(['status' => $param['status']]);
            return json(['ret' => 200, 'data' => ['msg' => '修改成功']]);
        }
        if (!empty($param['username'])) {
            $where['username'] = $param['username'];
        }
        $total = $this->db('users')->where($where)->count();
        if ($total == 0) {
            return json(['ret' => 200, 'total' => 0, 'data' => []]);
        }
        $data = $this->db('users')->where($where)->field('id,nickname,username,avatar,status,identity,addtime,lasttime,addip,loginip')->page($page, 10)->order('id asc')->select();
        return json(['ret' => 200, 'total' => $total, 'data' => $data]);
    }

    public function save()
    {
        $param = input('post.');
        if (!empty($param['password'])) {
            $param['salt'] = $this->get_randomstr();
            $param['password'] = $this->get_password($param['password'], $param['salt']);
        }
        $param['addtime'] = time();
        $param['addip'] = '127.0.0.1';
        $this->db('users')->insert($param);
        return json(['ret' => 200, 'data' => ['msg' => '添加成功']]);
    }
}
