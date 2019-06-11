<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="default")
     */
    public function indexAction()
    {
        return $this->render('default/news.html.twig', array(
            'repLogAppProps' => array(
                'type' => 'topstories'
            ),
        ));
    }

    /**
     * @Route("/newest")
     */
    public function newestAction()
    {
        return $this->render('default/news.html.twig', array(
            'repLogAppProps' => array(
                'type' => 'newstories'
            ),
        ));
    }

    /**
     * @Route("/best")
     */
    public function bestAction()
    {
        return $this->render('default/news.html.twig', array(
            'repLogAppProps' => array(
                'type' => 'beststories'
            ),
        ));
    }

    /**
     * @Route("/item")
     */
    public function itemAction(Request $request)
    {
        $itemId = $request->query->get('id');
        return $this->render('default/item.html.twig', array(
            'repLogAppProps' => array(
                'id' => $itemId
            ),
        ));

    }
}
