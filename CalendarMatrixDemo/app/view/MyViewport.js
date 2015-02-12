/*
 * File: app/view/MyViewport.js
 *
 * This file was generated by Sencha Architect version 3.2.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 5.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 5.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('CalendarMatrix.view.MyViewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.myviewport',

    requires: [
        'CalendarMatrix.view.MyViewportViewModel',
        'CalendarMatrix.view.MatrixEx1',
        'CalendarMatrix.view.MatrixEx2',
        'CalendarMatrix.view.MatrixEx3',
        'CalendarMatrix.view.MatrixEx4',
        'CalendarMatrix.view.MatrixEx5',
        'CalendarMatrix.view.MatrixEx6',
        'Ext.tab.Panel'
    ],

    viewModel: {
        type: 'myviewport'
    },
    layout: 'fit',

    items: [
        {
            xtype: 'tabpanel',
            itemId: 'mytabpanel',
            activeTab: 0,
            removePanelHeader: false,
            items: [
                {
                    xtype: 'matrixex1',
                    title: 'Matrix',
                    height: 289
                },
                {
                    xtype: 'matrixex2',
                    title: 'Multi-Select'
                },
                {
                    xtype: 'matrixex3',
                    title: 'Single Select'
                },
                {
                    xtype: 'matrixex4',
                    title: 'Range #1'
                },
                {
                    xtype: 'matrixex5',
                    title: 'Range #2'
                },
                {
                    xtype: 'matrixex6',
                    title: 'Range #3'
                }
            ]
        }
    ]

});