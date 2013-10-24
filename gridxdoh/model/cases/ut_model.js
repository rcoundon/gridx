define([
	'../util/utcommon',
	'./util'
], function(doh, util){

//------------------------------------------------------------------
doh.ts('syncListStore');

doh.td('byIndex', function(t){
	var model = util.createModel(false, {
		size: 100
	});
	for(var i = 0; i < 100; ++i){
		var rowCache = model.byIndex(i);
		t.is(i + 1, rowCache.data.id);
		t.is(i + 1, rowCache.rawData.id);
		t.is(i + 1, rowCache.item.id);
	}
});

doh.td('byIndex not exist', function(t){
	var model = util.createModel(false, {
		size: 100
	});
	t.f(model.byIndex(-1));
	t.f(model.byIndex(1000));
	t.f(model.byIndex('abc'));
	t.f(model.byIndex());
	t.f(model.byIndex(null));
});

doh.td('byId', function(t){
	var model = util.createModel(false, {
		size: 100
	});
	for(var i = 0; i < 100; ++i){
		var rowCache = model.byId(i + 1);
		t.is(i + 1, rowCache.data.id);
		t.is(i + 1, rowCache.rawData.id);
		t.is(i + 1, rowCache.item.id);
		t.is(i, rowCache.item.order);
	}
});

doh.td('byId not exist', function(t){
	var model = util.createModel(false, {
		size: 100
	});
	t.f(model.byId(-1));
	t.f(model.byId(1000));
	t.f(model.byId('abc'));
	t.f(model.byId());
	t.f(model.byId(null));
});

doh.td('byId zero based', function(t){
	var model = util.createModel(false, {
		size: 100,
		baseId: 0
	});
	t.is(0, model.byId(0).data.id);
	t.is(0, model.byId('0').data.id);
});



//---------------------------------------------------------
doh.ts('syncTreeStore');

doh.td('byIndex', function(t){
	var model = util.createModel(false, {
		size: 5,
		baseId: 'item',
		tree: true,
		maxLevel: 3,
		maxChildrenCount: 5,
		minChildrenCount: 5
	});
	t.is('item-1', model.byIndex(0).data.id);
	t.is('item-1-1', model.byIndex(0, 'item-1').data.id);
	t.is('item-2', model.byIndex(1).data.id);
	t.is('item-3-1-5', model.byIndex(4, 'item-3-1').data.id);
});

doh.td('byIndex not exist', function(t){
	var model = util.createModel(false, {
		size: 10,
		baseId: 'item',
		tree: true,
		maxLevel: 3,
		maxChildrenCount: 5,
		minChildrenCount: 5
	});
	t.f(model.byIndex(9, 'item-1'));
	t.f(model.byIndex(-1, 'item-1'));
	t.f(model.byIndex('abc', 'item-1'));
	t.f(model.byIndex(undefined, 'item-1'));
	t.f(model.byIndex(null, 'item-1'));
});




doh.go(
	'syncListStore',
	'syncTreeStore',
//    'everything',
0);

});

