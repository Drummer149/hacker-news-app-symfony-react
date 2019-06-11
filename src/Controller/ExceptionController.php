<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Debug\Exception\FlattenException;

class ExceptionController extends Controller
{

    public function showException(Request $req, FlattenException $exception)
    {
        $code = $exception->getStatusCode();
        if($code === 404 || $code === 500)
          return $this->render('Exception/error' . $code . '.html.twig');
        else
          return $this->render('Exception/error.default.html.twig');
    }

}
