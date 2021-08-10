<?php

namespace app\admin\controller;

class Article extends Error
{
    /* 
     @api {post} /admin/article/cats  后台分类列表
     @param string  name   null
     @return array 
    */
    public function cats()
    {
        $param = input('post.');

        if (isset($param['status']) && isset($param['id'])) {
            $where['id'] = $param['id'];
            $this->db('cats')->where($where)->update(['status' => $param['status']]);
            return json(['ret' => 200, 'data' => '修改成功']);
        }

        if (!empty($param['name'])) {
            $where['name'] = $param['name'];
            $data = $this->db('cats')->where($where)->order('sort asc')->select()->toArray();
            return json(['ret' => 200, 'data' => $data]);
        }

        $where = [];

        $data = $this->db('cats')->where([['pid', '=', 0]])->field('id,pid,name,icon,path,status,sort,Introduction,type,addtime')->order('sort asc')->select()->toArray();
        for ($i = 0; $i < count($data); $i++) {
            $children = $this->db('cats')->where([['pid', '=', $data[$i]['id']]])->field('id,pid,name,icon,path,status,sort,Introduction,type,addtime')->order('sort asc')->select()->toArray();
            $data[$i]['children'] = $children;
        }
        return json(['ret' => 200, 'data' => $data]);
    }

    /* 
     @api {post} /admin/article/save  后台分类保存
     @param int  id   null
     @return array 
    */
    public function save()
    {
        $param = input('post.');

        // 根据主键判断修改还是添加，此为修改
        if (!empty($param['id'])) {
            $where['id'] = $param['id'];
            unset($param['children']);
            $this->db('cats')->where($where)->update($param);
            return json(['ret' => 200, 'data' => ['msg' => '修改成功']]);
        }

        // 此为添加
        $data = array_merge($param, array('addtime' => time()));
        $this->db('cats')->insert($data);
        return json(['ret' => 200, 'data' => ['msg' => '添加成功']]);
    }

    /* 
     @api {post} /admin/article/getCats  获取分类用于发布文章时的树形显示
     @return array 
    */
    public function getCats()
    {
        $data = $this->db('cats')->where([['pid', '=', 0], ['type', '=', 1]])->field('id,name')->order('sort asc')->select()->toArray();
        for ($i = 0; $i < count($data); $i++) {
            $children = $this->db('cats')->where([['pid', '=', $data[$i]['id']]])->field('id,name')->order('sort asc')->select()->toArray();
            $data[$i]['children'] = $children;
        }
        return json(['ret' => 200, 'data' => $data]);
    }

    /* 
     @api {post} /admin/article/addArticle  后台文章发布
     @param string  title
     @param string  content
     @param string  cat
     @param int  addtime
     @return array 
    */
    public function addArticle()
    {
        $param = input('post.');
        if (isset($param['isEdit'])) {
            $data['update_time'] = time();
            $data['title'] = $param['title'];
            $data['content'] = $param['content'];
            $data['value'] = $param['value'];
            $data['cat'] = $param['catId'];
            isset($param['top_pic']) ? $data['top_pic'] = $param['top_pic'] : "";
            $this->db('article')->where('id', (int)$param['id'])->data($data)->update();
            return json(['ret' => 200, 'data' => '更新成功']);
        } else {
            $data['add_time'] = time();
            $data['title'] = $param['title'];
            $data['content'] = $param['content'];
            $data['value'] = $param['value'];
            $data['cat'] = $param['catId'];
            isset($param['top_pic']) ? $data['top_pic'] = $param['top_pic'] : "";
            $this->db('article')->insert($data);
            return json(['ret' => 200, 'data' => '发布成功']);
        }
    }

    /* 
     @api {post} /admin/article/getArticle  后台文章列表
     @param string  type
     @return array 
    */
    public function getArticle()
    {
        $param = input('post.');
        if (isset($param['title']) && $param['title'] != "") {
            $data = $this->db('article')->where('title', 'like', '%' . $param['title'] . '%')->select();
        } else {
            $data = $this->db('article')->order('id', 'desc')->select()->toArray();
        }

        foreach ($data as &$val) {
            $catName = explode(",", $val['cat']);
            for ($i = 0; $i < count($catName); $i++) {
                $name = $this->db('cats')->where('id', $catName[$i])->find();
                $catName[$i] = $name['name'];
            }
            $val['cat'] = $catName;
        }
        return json(['ret' => 200, 'data' => $data]);
    }

    public function deleteArticle()
    {
        $param = input('post.');
        $this->db('article')->delete((int)$param['id']);
        return json(['ret' => 200, 'data' => ['msg' => '删除成功']]);
    }

    public function getArticleDetails()
    {
        $param = input('post.');
        $data = $this->db('article')->where('id', (int)$param['id'])->find();
        return json(['ret' => 200, 'data' => $data]);
    }

    public function deleteCat()
    {
        $param = input('post.');
        $this->db('cats')->where('id', $param['id'])->delete();
        return json(['ret' => 200, 'data' => '删除成功']);
    }
}
