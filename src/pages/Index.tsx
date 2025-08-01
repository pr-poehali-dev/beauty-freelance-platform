import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [selectedMaster, setSelectedMaster] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('master');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [filteredMasters, setFilteredMasters] = useState(masters);

  // Фильтрация мастеров
  useEffect(() => {
    let filtered = masters.filter(master => {
      const matchesService = !selectedService || master.services.includes(selectedService);
      const matchesLocation = !selectedLocation || master.location.toLowerCase().includes(selectedLocation.toLowerCase());
      const matchesPrice = master.price >= priceRange[0] && master.price <= priceRange[1];
      const matchesAvailability = !onlyAvailable || master.available;
      const matchesSearch = !searchQuery || master.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           master.services.some(service => service.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesService && matchesLocation && matchesPrice && matchesAvailability && matchesSearch;
    });
    
    setFilteredMasters(filtered);
  }, [selectedService, selectedLocation, priceRange, onlyAvailable, searchQuery]);

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  const handleAuth = (e) => {
    e.preventDefault();
    // Здесь будет логика аутентификации
    setIsLoggedIn(true);
    setCurrentUser({ name: 'Пользователь', type: userType });
    setShowAuth(false);
  };

  const handleBooking = () => {
    if (!isLoggedIn) {
      setShowAuth(true);
      return;
    }
    setShowBooking(true);
  };

  const MapPlaceholder = () => (
    <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center border">
      <div className="text-center">
        <Icon name="Map" size={48} className="text-gray-400 mx-auto mb-2" />
        <p className="text-gray-500 font-medium">Интерактивная карта</p>
        <p className="text-sm text-gray-400">Показать мастеров на карте</p>
      </div>
    </div>
  );

  const services = [
    'Стрижка', 'Окрашивание', 'Маникюр', 'Педикюр', 'Макияж', 
    'Брови', 'Ресницы', 'Массаж', 'Косметология'
  ];

  const masters = [
    {
      id: 1,
      name: 'Анна Петрова',
      avatar: '/placeholder.svg',
      rating: 4.9,
      reviews: 127,
      services: ['Стрижка', 'Окрашивание'],
      price: 2500,
      priceText: '2500 ₽/час',
      location: 'Центр',
      coordinates: [55.7558, 37.6176],
      available: true,
      experience: '5 лет',
      description: 'Профессиональный стилист-колорист с международными сертификатами',
      portfolio: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
      address: 'ул. Тверская, 15',
      phone: '+7 (999) 123-45-67',
      workHours: '10:00 - 20:00',
      specializations: ['Сложное окрашивание', 'Стрижки любой сложности', 'Укладки']
    },
    {
      id: 2,
      name: 'Мария Иванова',
      avatar: '/placeholder.svg',
      rating: 4.8,
      reviews: 89,
      services: ['Маникюр', 'Педикюр'],
      price: 1800,
      priceText: '1800 ₽/час',
      location: 'Север',
      coordinates: [55.8058, 37.6176],
      available: true,
      experience: '3 года',
      description: 'Мастер ногтевого сервиса, специалист по дизайну',
      portfolio: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
      address: 'ул. Дмитровская, 25',
      phone: '+7 (999) 234-56-78',
      workHours: '9:00 - 19:00',
      specializations: ['Гель-лак', 'Наращивание', 'Дизайн ногтей']
    },
    {
      id: 3,
      name: 'Елена Смирнова',
      avatar: '/placeholder.svg',
      rating: 5.0,
      reviews: 156,
      services: ['Макияж', 'Брови'],
      price: 3000,
      priceText: '3000 ₽/час',
      location: 'Юг',
      coordinates: [55.7058, 37.6176],
      available: false,
      experience: '7 лет',
      description: 'Визажист-бровист, участник международных конкурсов',
      portfolio: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
      address: 'ул. Ленинский проспект, 45',
      phone: '+7 (999) 345-67-89',
      workHours: '11:00 - 21:00',
      specializations: ['Свадебный макияж', 'Архитектура бровей', 'Вечерний макияж']
    }
  ];

  const urgentRequests = [
    {
      id: 1,
      salon: 'Салон "Элегант"',
      service: 'Стрижка мужская',
      time: 'Сегодня 15:00-20:00',
      price: '2000 ₽',
      urgent: true
    },
    {
      id: 2,
      salon: 'Студия красоты "Лотос"',
      service: 'Маникюр',
      time: 'Завтра 10:00-14:00',
      price: '1500 ₽',
      urgent: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-beauty-pink/10 via-white to-beauty-purple/10">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-beauty-pink to-beauty-purple rounded-lg flex items-center justify-center">
                <Icon name="Sparkles" size={20} className="text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-beauty-pink to-beauty-purple bg-clip-text text-transparent">
                BeautyMatch
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-gray-600 hover:text-beauty-pink transition-colors">Мастера</a>
              <a href="#" className="text-gray-600 hover:text-beauty-pink transition-colors">Салоны</a>
              <a href="#" className="text-gray-600 hover:text-beauty-pink transition-colors">Как работает</a>
              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">Привет, {currentUser?.name}!</span>
                  <Button variant="outline" onClick={() => setIsLoggedIn(false)}>
                    Выйти
                  </Button>
                </div>
              ) : (
                <>
                  <Dialog open={showAuth} onOpenChange={setShowAuth}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="border-beauty-pink text-beauty-pink hover:bg-beauty-pink hover:text-white">
                        Вход
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>{isLogin ? 'Вход в аккаунт' : 'Регистрация'}</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleAuth} className="space-y-4">
                        <div className="space-y-2">
                          <Label>Тип аккаунта</Label>
                          <Select value={userType} onValueChange={setUserType}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="master">Мастер</SelectItem>
                              <SelectItem value="salon">Салон красоты</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Email</Label>
                          <Input type="email" placeholder="example@mail.com" required />
                        </div>
                        <div className="space-y-2">
                          <Label>Пароль</Label>
                          <Input type="password" placeholder="••••••••" required />
                        </div>
                        {!isLogin && (
                          <>
                            <div className="space-y-2">
                              <Label>Имя</Label>
                              <Input placeholder="Ваше имя" required />
                            </div>
                            <div className="space-y-2">
                              <Label>Телефон</Label>
                              <Input placeholder="+7 (999) 123-45-67" required />
                            </div>
                          </>
                        )}
                        <Button type="submit" className="w-full bg-gradient-to-r from-beauty-pink to-beauty-purple">
                          {isLogin ? 'Войти' : 'Зарегистрироваться'}
                        </Button>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          className="w-full"
                          onClick={() => setIsLogin(!isLogin)}
                        >
                          {isLogin ? 'Нет аккаунта? Регистрация' : 'Уже есть аккаунт? Войти'}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <Button 
                    className="bg-gradient-to-r from-beauty-pink to-beauty-purple hover:from-beauty-pink/90 hover:to-beauty-purple/90"
                    onClick={() => { setIsLogin(false); setShowAuth(true); }}
                  >
                    Регистрация
                  </Button>
                </>
              )}
            </nav>
            <Button variant="ghost" className="md:hidden">
              <Icon name="Menu" size={24} />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-beauty-pink to-beauty-purple bg-clip-text text-transparent">
            Фриланс для бьюти-мастеров
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Находите клиентов мгновенно или срочно закрывайте смены в салоне. 
            Быстро, удобно, безопасно.
          </p>

          {/* Search Bar */}
          <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-6 mb-12">
            <Tabs defaultValue="find-master" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="find-master" className="text-base">Найти мастера</TabsTrigger>
                <TabsTrigger value="find-work" className="text-base">Найти работу</TabsTrigger>
              </TabsList>
              
              <TabsContent value="find-master" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                  <Input 
                    placeholder="Поиск по имени или услуге"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="py-3"
                  />
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger className="py-3">
                      <SelectValue placeholder="Выберите услугу" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Все услуги</SelectItem>
                      {services.map(service => (
                        <SelectItem key={service} value={service}>{service}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="py-3">
                      <SelectValue placeholder="Район города" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Все районы</SelectItem>
                      <SelectItem value="Центр">Центр</SelectItem>
                      <SelectItem value="Север">Север</SelectItem>
                      <SelectItem value="Юг">Юг</SelectItem>
                      <SelectItem value="Восток">Восток</SelectItem>
                      <SelectItem value="Запад">Запад</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button 
                    className="bg-gradient-to-r from-beauty-pink to-beauty-purple hover:from-beauty-pink/90 hover:to-beauty-purple/90 py-3"
                    onClick={() => setShowMap(!showMap)}
                  >
                    <Icon name={showMap ? "List" : "Map"} size={20} className="mr-2" />
                    {showMap ? 'Каталог' : 'Карта'}
                  </Button>
                </div>
                
                {/* Дополнительные фильтры */}
                <Card className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Цена за час: {priceRange[0]} - {priceRange[1]} ₽</Label>
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        min={0}
                        max={5000}
                        step={100}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="available-only"
                        checked={onlyAvailable}
                        onCheckedChange={setOnlyAvailable}
                      />
                      <Label htmlFor="available-only" className="text-sm">Только доступные</Label>
                    </div>
                    
                    <div className="text-right">
                      <Badge variant="outline" className="text-sm">
                        Найдено: {filteredMasters.length} мастеров
                      </Badge>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="find-work" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input 
                    placeholder="Ваша специализация"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="py-6 text-lg"
                  />
                  <Select>
                    <SelectTrigger className="py-6">
                      <SelectValue placeholder="Когда готовы работать" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Сегодня</SelectItem>
                      <SelectItem value="tomorrow">Завтра</SelectItem>
                      <SelectItem value="week">На этой неделе</SelectItem>
                      <SelectItem value="flexible">Гибкий график</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="bg-gradient-to-r from-beauty-pink to-beauty-purple hover:from-beauty-pink/90 hover:to-beauty-purple/90 text-lg py-6">
                    <Icon name="Briefcase" size={20} className="mr-2" />
                    Найти работу
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-beauty-pink mb-2">2,500+</div>
              <div className="text-gray-600">Активных мастеров</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-beauty-purple mb-2">850+</div>
              <div className="text-gray-600">Партнерских салонов</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-beauty-light mb-2">15 мин</div>
              <div className="text-gray-600">Среднее время поиска</div>
            </div>
          </div>
        </div>
      </section>

      {/* Urgent Requests Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Срочные запросы</h2>
            <div className="flex items-center text-red-500">
              <Icon name="Clock" size={20} className="mr-2" />
              <span className="font-medium">Обновлено 2 минуты назад</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {urgentRequests.map(request => (
              <Card key={request.id} className={`hover:shadow-lg transition-shadow ${request.urgent ? 'border-red-300 bg-red-50/30' : ''}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{request.salon}</CardTitle>
                    {request.urgent && (
                      <Badge variant="destructive" className="animate-pulse">
                        <Icon name="AlertCircle" size={14} className="mr-1" />
                        СРОЧНО
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <Icon name="Scissors" size={16} className="mr-2" />
                      <span>{request.service}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Icon name="Clock" size={16} className="mr-2" />
                      <span>{request.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-green-600 font-semibold">
                        <Icon name="DollarSign" size={16} className="mr-1" />
                        <span>{request.price}</span>
                      </div>
                      <Button 
                        size="sm" 
                        className={request.urgent ? 
                          "bg-red-500 hover:bg-red-600" : 
                          "bg-gradient-to-r from-beauty-pink to-beauty-purple hover:from-beauty-pink/90 hover:to-beauty-purple/90"
                        }
                      >
                        Откликнуться
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Masters Catalog / Map */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              {showMap ? 'Мастера на карте' : 'Каталог мастеров'}
            </h2>
          </div>
          
          {showMap ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <MapPlaceholder />
              </div>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {filteredMasters.map(master => (
                  <Card key={master.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedMaster(master)}>
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={master.avatar} alt={master.name} />
                        <AvatarFallback className="bg-gradient-to-r from-beauty-pink to-beauty-purple text-white">
                          {master.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm truncate">{master.name}</h3>
                        <div className="flex items-center text-xs text-gray-500">
                          <Icon name="Star" size={12} className="text-yellow-400 mr-1 fill-current" />
                          <span>{master.rating}</span>
                          <span className="mx-1">•</span>
                          <span>{master.priceText}</span>
                        </div>
                        <div className="flex items-center mt-1">
                          <div className={`w-2 h-2 rounded-full mr-2 ${master.available ? 'bg-green-400' : 'bg-red-400'}`} />
                          <span className="text-xs text-gray-500">{master.available ? 'Доступен' : 'Занят'}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMasters.map(master => (
                <Card key={master.id} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="text-center">
                    <Avatar className="w-20 h-20 mx-auto mb-4">
                      <AvatarImage src={master.avatar} alt={master.name} />
                      <AvatarFallback className="bg-gradient-to-r from-beauty-pink to-beauty-purple text-white text-xl">
                        {master.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-xl">{master.name}</CardTitle>
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Icon name="Star" size={16} className="text-yellow-400 mr-1 fill-current" />
                        <span>{master.rating}</span>
                      </div>
                      <span>•</span>
                      <span>{master.reviews} отзывов</span>
                      <span>•</span>
                      <span>{master.experience}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {master.services.map(service => (
                        <Badge key={service} variant="secondary" className="bg-gradient-to-r from-beauty-pink/10 to-beauty-purple/10 text-beauty-purple border-beauty-purple/20">
                          {service}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center">
                        <Icon name="MapPin" size={14} className="mr-1" />
                        <span>{master.location}</span>
                      </div>
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${master.available ? 'bg-green-400' : 'bg-red-400'}`} />
                        <span>{master.available ? 'Доступен' : 'Занят'}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-beauty-purple">{master.priceText}</span>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedMaster(master)}
                            >
                              <Icon name="Eye" size={14} className="mr-1" />
                              Профиль
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="flex items-center space-x-3">
                                <Avatar className="w-16 h-16">
                                  <AvatarImage src={master.avatar} alt={master.name} />
                                  <AvatarFallback className="bg-gradient-to-r from-beauty-pink to-beauty-purple text-white">
                                    {master.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="text-2xl font-bold">{master.name}</h3>
                                  <div className="flex items-center text-sm text-gray-600">
                                    <Icon name="Star" size={14} className="text-yellow-400 mr-1 fill-current" />
                                    <span>{master.rating} ({master.reviews} отзывов)</span>
                                  </div>
                                </div>
                              </DialogTitle>
                            </DialogHeader>
                            
                            <div className="space-y-6 mt-6">
                              <div>
                                <h4 className="font-semibold mb-2">О мастере</h4>
                                <p className="text-gray-600">{master.description}</p>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-semibold mb-2">Контакты</h4>
                                  <div className="space-y-1 text-sm text-gray-600">
                                    <div className="flex items-center">
                                      <Icon name="MapPin" size={14} className="mr-2" />
                                      <span>{master.address}</span>
                                    </div>
                                    <div className="flex items-center">
                                      <Icon name="Phone" size={14} className="mr-2" />
                                      <span>{master.phone}</span>
                                    </div>
                                    <div className="flex items-center">
                                      <Icon name="Clock" size={14} className="mr-2" />
                                      <span>{master.workHours}</span>
                                    </div>
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="font-semibold mb-2">Услуги</h4>
                                  <div className="flex flex-wrap gap-1">
                                    {master.services.map(service => (
                                      <Badge key={service} variant="outline" className="text-xs">
                                        {service}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="font-semibold mb-2">Специализация</h4>
                                <div className="flex flex-wrap gap-2">
                                  {master.specializations.map(spec => (
                                    <Badge key={spec} className="bg-gradient-to-r from-beauty-pink/10 to-beauty-purple/10 text-beauty-purple border-beauty-purple/20">
                                      {spec}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="font-semibold mb-3">Портфолио</h4>
                                <div className="grid grid-cols-3 gap-2">
                                  {master.portfolio.map((image, index) => (
                                    <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                                      <img 
                                        src={image} 
                                        alt={`Работа ${index + 1}`}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between pt-4 border-t">
                                <div>
                                  <div className="text-2xl font-bold text-beauty-purple">{master.priceText}</div>
                                  <div className="flex items-center text-sm text-gray-600">
                                    <div className={`w-2 h-2 rounded-full mr-2 ${master.available ? 'bg-green-400' : 'bg-red-400'}`} />
                                    <span>{master.available ? 'Доступен сейчас' : 'Занят'}</span>
                                  </div>
                                </div>
                                <Button 
                                  className="bg-gradient-to-r from-beauty-pink to-beauty-purple hover:from-beauty-pink/90 hover:to-beauty-purple/90"
                                  disabled={!master.available}
                                  onClick={handleBooking}
                                >
                                  <Icon name="Calendar" size={16} className="mr-2" />
                                  Забронировать
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        <Button 
                          className="bg-gradient-to-r from-beauty-pink to-beauty-purple hover:from-beauty-pink/90 hover:to-beauty-purple/90"
                          disabled={!master.available}
                          size="sm"
                          onClick={handleBooking}
                        >
                          <Icon name="Calendar" size={14} className="mr-1" />
                          Бронь
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Система бронирования */}
      <Dialog open={showBooking} onOpenChange={setShowBooking}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Бронирование услуги</DialogTitle>
          </DialogHeader>
          
          <form className="space-y-4">
            <div className="space-y-2">
              <Label>Выберите дату</Label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date()}
                className="rounded-md border"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Время</Label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите время" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map(time => (
                    <SelectItem key={time} value={time}>{time}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Комментарий</Label>
              <Textarea placeholder="Опишите желаемую услугу..." />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-beauty-pink to-beauty-purple"
              onClick={(e) => {
                e.preventDefault();
                setShowBooking(false);
                // Логика бронирования
              }}
            >
              Подтвердить бронирование
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-beauty-pink/5 via-white to-beauty-purple/5">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Почему выбирают нас</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-gradient-to-r from-beauty-pink to-beauty-purple rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Zap" size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Мгновенный поиск</h3>
                <p className="text-gray-600">Находите мастеров за 15 минут или получайте срочные заказы моментально</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-gradient-to-r from-beauty-pink to-beauty-purple rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Shield" size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Безопасные сделки</h3>
                <p className="text-gray-600">Проверенные профили, система рейтингов и безопасная оплата через платформу</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-gradient-to-r from-beauty-pink to-beauty-purple rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="TrendingUp" size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Рост доходов</h3>
                <p className="text-gray-600">Увеличьте заработок на 40% благодаря оптимальной загрузке и премиум-клиентам</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Личные кабинеты */}
      {isLoggedIn && (
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Личный кабинет</h2>
              <p className="text-gray-600">Добро пожаловать, {currentUser?.name}!</p>
            </div>
            
            <Tabs defaultValue={currentUser?.type === 'master' ? 'master-dashboard' : 'salon-dashboard'} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="master-dashboard" disabled={currentUser?.type !== 'master'}>
                  Кабинет мастера
                </TabsTrigger>
                <TabsTrigger value="salon-dashboard" disabled={currentUser?.type !== 'salon'}>
                  Кабинет салона
                </TabsTrigger>
              </TabsList>
              
              {/* Кабинет мастера */}
              <TabsContent value="master-dashboard" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Статистика */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center">
                        <Icon name="TrendingUp" size={20} className="mr-2 text-green-500" />
                        Статистика
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Заказов за месяц:</span>
                        <span className="font-semibold">24</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Доход:</span>
                        <span className="font-semibold text-green-600">85,000 ₽</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Рейтинг:</span>
                        <div className="flex items-center">
                          <Icon name="Star" size={14} className="text-yellow-400 mr-1 fill-current" />
                          <span className="font-semibold">4.9</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Ближайшие записи */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center">
                        <Icon name="Calendar" size={20} className="mr-2 text-blue-500" />
                        Ближайшие записи
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="border-l-4 border-beauty-pink pl-3">
                        <div className="text-sm font-medium">Сегодня 14:00</div>
                        <div className="text-xs text-gray-600">Маникюр - Мария П.</div>
                      </div>
                      <div className="border-l-4 border-beauty-purple pl-3">
                        <div className="text-sm font-medium">Завтра 10:30</div>
                        <div className="text-xs text-gray-600">Стрижка - Ольга К.</div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Новые запросы */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center">
                        <Icon name="Bell" size={20} className="mr-2 text-orange-500" />
                        Новые запросы
                        <Badge className="ml-2 bg-red-500">3</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium">Макияж</div>
                          <div className="text-xs text-gray-600">Сегодня 18:00</div>
                        </div>
                        <Button size="sm" className="bg-beauty-pink hover:bg-beauty-pink/90">
                          Отклик
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Календарь и профиль */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Мой календарь</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md border w-full"
                      />
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Мой профиль</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-16 h-16">
                          <AvatarFallback className="bg-gradient-to-r from-beauty-pink to-beauty-purple text-white text-xl">
                            М
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{currentUser?.name}</h3>
                          <p className="text-sm text-gray-600">Мастер по маникюру</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Описание</Label>
                        <Textarea placeholder="Расскажите о себе..." />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Услуги</Label>
                        <div className="flex flex-wrap gap-2">
                          <Badge>Маникюр</Badge>
                          <Badge>Педикюр</Badge>
                          <Button variant="outline" size="sm">
                            <Icon name="Plus" size={14} className="mr-1" />
                            Добавить
                          </Button>
                        </div>
                      </div>
                      
                      <Button className="w-full bg-gradient-to-r from-beauty-pink to-beauty-purple">
                        Обновить профиль
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              {/* Кабинет салона */}
              <TabsContent value="salon-dashboard" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center">
                        <Icon name="Users" size={20} className="mr-2 text-blue-500" />
                        Мастера
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-blue-600">12</div>
                      <p className="text-sm text-gray-600">Активных</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center">
                        <Icon name="Calendar" size={20} className="mr-2 text-green-500" />
                        Записи
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">47</div>
                      <p className="text-sm text-gray-600">На сегодня</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center">
                        <Icon name="DollarSign" size={20} className="mr-2 text-yellow-500" />
                        Доход
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-yellow-600">285k</div>
                      <p className="text-sm text-gray-600">За месяц</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center">
                        <Icon name="AlertCircle" size={20} className="mr-2 text-red-500" />
                        Срочно
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-red-600">3</div>
                      <p className="text-sm text-gray-600">Запроса</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Поиск мастеров */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Найти мастера</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Услуга</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите услугу" />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map(service => (
                              <SelectItem key={service} value={service}>{service}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Дата и время</Label>
                        <div className="grid grid-cols-2 gap-2">
                          <Input type="date" />
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Время" />
                            </SelectTrigger>
                            <SelectContent>
                              {timeSlots.map(time => (
                                <SelectItem key={time} value={time}>{time}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch id="urgent-request" />
                        <Label htmlFor="urgent-request" className="text-sm">Срочный запрос</Label>
                      </div>
                      
                      <Button className="w-full bg-gradient-to-r from-beauty-pink to-beauty-purple">
                        <Icon name="Search" size={16} className="mr-2" />
                        Найти мастера
                      </Button>
                    </CardContent>
                  </Card>
                  
                  {/* Мои запросы */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Мои запросы</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="border border-red-200 bg-red-50 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="destructive" className="text-xs">СРОЧНО</Badge>
                            <span className="text-xs text-gray-500">Сегодня 15:00</span>
                          </div>
                          <div className="text-sm font-medium">Маникюр на дому</div>
                          <div className="text-xs text-gray-600">3 отклика</div>
                          <Button size="sm" className="mt-2 w-full">Посмотреть</Button>
                        </div>
                        
                        <div className="border rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="secondary" className="text-xs">ОБЫЧНО</Badge>
                            <span className="text-xs text-gray-500">Завтра 10:00</span>
                          </div>
                          <div className="text-sm font-medium">Стрижка мужская</div>
                          <div className="text-xs text-gray-600">7 откликов</div>
                          <Button size="sm" className="mt-2 w-full">Посмотреть</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {!isLoggedIn && (
        <section className="py-20 px-4 bg-gradient-to-r from-beauty-pink to-beauty-purple">
          <div className="container mx-auto text-center text-white">
            <h2 className="text-4xl font-bold mb-6">Готовы начать зарабатывать больше?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Присоединяйтесь к тысячам мастеров, которые уже увеличили свой доход с BeautyMatch
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary" 
                className="bg-white text-beauty-purple hover:bg-gray-100 px-8 py-4 text-lg"
                onClick={() => { setUserType('master'); setIsLogin(false); setShowAuth(true); }}
              >
                <Icon name="User" size={20} className="mr-2" />
                Регистрация мастера
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-beauty-purple px-8 py-4 text-lg"
                onClick={() => { setUserType('salon'); setIsLogin(false); setShowAuth(true); }}
              >
                <Icon name="Building" size={20} className="mr-2" />
                Регистрация салона
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-beauty-pink to-beauty-purple rounded-lg flex items-center justify-center">
                  <Icon name="Sparkles" size={20} className="text-white" />
                </div>
                <span className="text-xl font-bold">BeautyMatch</span>
              </div>
              <p className="text-gray-400">Фриланс-платформа для мастеров красоты и салонов</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Для мастеров</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Регистрация</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Поиск заказов</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Портфолио</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Отзывы</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Для салонов</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Найти мастера</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Срочные заказы</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Управление</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Аналитика</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Центр помощи</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Безопасность</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Условия</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BeautyMatch. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}