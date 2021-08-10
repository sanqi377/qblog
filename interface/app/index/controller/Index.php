<?php

declare(strict_types=1);

namespace app\index\controller;

class Index extends Common
{
    public function index()
    {
        return '您好！这是一个[index]示例应用';
    }

    public function getNav()
    {
        $data = $this->db('cats')->where([['pid', '=', 0], ['status', '=', 1]])->field('id,name,path,icon,Introduction,type')->order('sort asc')->select()->toArray();
        for ($i = 0; $i < count($data); $i++) {
            $children = $this->db('cats')->where([['pid', '=', $data[$i]['id']], ['status', '=', 1]])->field('id,name,path,icon,Introduction,type')->order('sort asc')->select()->toArray();
            $data[$i]['children'] = $children;
        }
        return json(['ret' => 200, 'data' => $data]);
    }

    /**
     * api => /index/index/getArticle
     * param => (int)limit can null
     * dsc => return five articles pre request, one page = five articles
     */
    public function getArticle()
    {
        $param = input('post.');
        $defaultLimit = 0; // default query count.
        $isBottom = 0; // whether next pages.

        // if frontend request greater than five, that return count equal to request count reduce five.
        if ((int)$param['limit'] > 5) {
            $defaultLimit = (int)$param['limit'] -= 5;
        }

        // if have param path,that is categorical page request,empty is home request.
        if (isset($param['path'])) {
            $cat = $this->db('cats')->where('path', '/' . $param['path'])->find();
            $data = $this->db('article')->where('cat', $cat['id'])->order('id', 'desc')->limit($defaultLimit, (int)$param['limit'])->select()->toArray();
            foreach ($data as &$k) {
                $cat_name = $this->db('cats')->where('id', $k['cat'])->field('name')->find();
                $k['cat_name'] = $cat_name['name'];
            }
            $isBottom = $this->db('article')->where('cat', $cat['id'])->order('id', 'desc')->limit($defaultLimit, (int)$param['limit'] + 1)->select()->toArray();
        } else {
            $data = $this->db('article')->order('id', 'desc')->limit($defaultLimit, (int)$param['limit'])->select()->toArray();
            foreach ($data as &$k) {
                $cat_name = $this->db('cats')->where('id', $k['cat'])->field('name')->find();
                $k['cat_name'] = $cat_name['name'];
            }

            $isBottom = $this->db('article')->order('id', 'desc')->limit($defaultLimit, (int)$param['limit'] + 1)->select()->toArray();
        }

        // if return count equal to five,that is no next pages.
        if (count($isBottom) != 6) {
            $isBottom = true;
        } else {
            $isBottom = false;
        }

        return json(['ret' => 200, 'data' => $data, 'count' => $defaultLimit, 'isBottom' => $isBottom]);
    }

    public function searchArticle()
    {
        $param = input('post.');
        if (isset($param['search'])) {
            $data = $this->db('article')->where([
                ['title', 'like', '%' . $param['search'] . '%'],
            ])->select();
            return json(['ret' => 200, 'data' => $data]);
        }
    }

    public function getWebSetting()
    {
        $data = $this->db('system')->select();
        return json(['ret' => 200, 'data' => $data]);
    }
}
